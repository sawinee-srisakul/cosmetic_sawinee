from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Email

class CheckoutForm(FlaskForm):
    firstname = StringField("First Name", validators=[InputRequired()])
    surname = StringField("Surname", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email()]) 
    address = StringField("Address", validators=[InputRequired()])
    phone = StringField("Phone Number", validators=[InputRequired()])
    submit = SubmitField("Complete Order")