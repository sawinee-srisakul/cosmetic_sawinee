from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from .models import Product, Order, OrderDetail, Category
from .forms import CheckoutForm
from . import db

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    products = Product.query.order_by(Product.name).all()
    return render_template('index.html', products=products)

@bp.route('/product/<int:product_id>/')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product_detail.html', product=product)

@bp.route('/basket', methods=['GET', 'POST'])
def basket():
    order = None
    if 'order_id' in session:
        order = Order.query.get(session['order_id'])
        print(f"Order ID from session: {session['order_id']}")
        print(f"Order details count: {len(order.order_details) if order else 0}")

    if order is None:
        print("No order_id in session")
        order = Order(firstname='', surname='', email='', address='', phone='')
        db.session.add(order)
        db.session.commit()
        session['order_id'] = order.id

    # Handle POST: Add product to basket
    if request.method == 'POST':
      product_id = request.form.get('product_id', type=int)
      if product_id:
          product = Product.query.get(product_id)
          if not product:
            flash('Product not found')
            return redirect(url_for('main.basket'))

        # Check if product already in order details
          existing_detail = None
          for detail in order.order_details:
              if detail.product_id == product.id:
                  existing_detail = detail
                  break

          if existing_detail:
              # add quantity in basket
              existing_detail.quantity += 1
          else:
              # create new order detail 
              new_detail = OrderDetail(order_id=order.id, product_id=product.id, quantity=1)
              db.session.add(new_detail)

          db.session.commit()
          flash(f'Added {product.name} to basket')
          return redirect(url_for('main.basket'))

    # calculate total amount
    total_price = 0
    for detail in order.order_details:
        total_price += detail.product.price * detail.quantity

    return render_template('basket.html', order=order, total_price=total_price)

@bp.route('/basket/remove', methods=['POST'])
def remove_from_basket():
    product_id = request.form.get('product_id', type=int)
    if 'order_id' in session and product_id:
        order = Order.query.get(session['order_id'])
        detail_to_remove = None
        for detail in order.order_details:
            if detail.product_id == product_id:
                detail_to_remove = detail
                break
        if detail_to_remove:
            db.session.delete(detail_to_remove)
            db.session.commit()
            flash('Item removed from basket')
    return redirect(url_for('main.basket'))

@bp.route('/basket/update_quantity', methods=['POST'])
def update_quantity():
    if 'order_id' not in session:
        flash('Your basket is empty')
        return redirect(url_for('main.index'))

    order = Order.query.get(session['order_id'])
    product_id = request.form.get('product_id')
    action = request.form.get('action')

    if not product_id or action not in ['increase', 'decrease']:
        flash('Invalid request')
        return redirect(url_for('main.basket'))

    detail = next((d for d in order.order_details if d.product_id == int(product_id)), None)
    if detail is None:
        flash('Product not in basket')
        return redirect(url_for('main.basket'))

    if action == 'increase':
        detail.quantity += 1
    elif action == 'decrease':
        if detail.quantity > 1:
            detail.quantity -= 1
        else:
            db.session.delete(detail)

    db.session.commit()
    flash('Basket updated')
    return redirect(url_for('main.basket'))

@bp.route('/checkout', methods=['GET', 'POST'])
def checkout():
    form = CheckoutForm()
    if 'order_id' not in session:
        flash('Your basket is empty')
        return redirect(url_for('main.index'))

    order = Order.query.get(session['order_id'])
    print("Order loaded:", order)


    if form.validate_on_submit(): 
        print("Form submitted. Updating order...")
        print(f"Before update: {order}")

        # Print form data
        print("Form data:")
        print("Firstname:", form.firstname.data)
        print("Surname:", form.surname.data)
        print("Email:", form.email.data)
        print("Address:", form.address.data)
        print("Phone:", form.phone.data)

        #update order info
        order.firstname = form.firstname.data
        order.surname = form.surname.data
        order.email = form.email.data
        order.address = form.address.data
        order.phone = form.phone.data
        # calculate cost from order_details
        total_cost = 0
        for detail in order.order_details:
            total_cost += detail.product.price * detail.quantity
        order.totalcost = total_cost
        order.status = True
       
        #save to database
        # Commit to database
        try:
            db.session.commit()
            print("Order committed successfully.")
        except Exception as e:
            print("Error during commit:", e)
            db.session.rollback()

        # Confirm everything saved
        saved = Order.query.get(order.id)
        print("Saved order:", saved)
        for d in saved.order_details:
            print(f"- {d.product.name}: {d.quantity}")


        print(f"After update: {order}")
        session.pop('order_id')

        flash(f'Purchase successful! Thank you for shopping with us')
        #return redirect(url_for('main.index'))
        session['last_order_id'] = order.id
        return redirect(url_for('main.thank_you'))

    return render_template('checkout.html', form=form)

@bp.route('/products')
def product_list():
    search_term = request.args.get('search', '').strip().lower()

    products = None
    if search_term:
        products = Product.query \
            .filter(Product.name.ilike(f'%{search_term}%')) \
            .order_by(Product.name).all()

    categories = Category.query.order_by(Category.name).all()

    return render_template(
        'product_list.html',
        products=products,
        categories=categories,
        search_term=search_term
    )

@bp.route('/thank-you')
def thank_you():
    order_id = session.get('last_order_id')
    if not order_id:
        flash("No recent order found.")
        return redirect(url_for('main.index'))

    order = Order.query.get_or_404(order_id)
    return render_template('thank_you.html', order=order)
