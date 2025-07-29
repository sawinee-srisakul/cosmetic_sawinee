from sawineecosmetic import create_app, db
from sawineecosmetic.models import Category, Product
import os

app = create_app()
app.app_context().push()

# delete old db if exists 
db_path = 'sawineecosmetic.sqlite'
if os.path.exists(db_path):
    os.remove(db_path)

# create db base on model
db.create_all()

# Create categories table
makeup = Category(name="Makeup")
skincare = Category(name="Skincare")
db.session.add_all([makeup, skincare])
db.session.commit()

# add initial products
products = [
    Product(name='Rare Beauty Soft Pinch Liquid Blush • 7.5ml',
            description="Finish: Matte, Radiant\nLightweight formula\nParaben-free\nDermatologist tested",
            image='products/lip1.png',
            price=29.99,
            category=makeup),
    Product(name='Fenty Beauty Gloss Bomb Universal Lip Luminizer',
            description="Gloss Bomb Universal Lip Luminizer • 9ml\nFormulation: Liquid\nBenefits: Hydrating\n*Ingredients*\nProduct Claims: AHAs/Glycolic Acid, Anti-oxidants, Oil-free, Paraben-free, Peptides, Silicone-free, Sulphate-free, Vitamins",
            image='products/lip2.png',
            price=35.50,
            category=makeup),
    Product(name='Deep hydration Lotion',
            description="Non-greasy\nSuitable for all skin types\nSkin Type: Combination, Dry, Normal, Oily\nSkin Concerns: Dryness, Dullness, Fine Lines & Wrinkles, Uneven Skin Texture, Uneven Skin Tone\nFormulation: Lotion\nSkincare By Age: 20s, 30s, 40s, 50+, Under 20",
            image='products/lotion.png',
            price=19.99, 
            category=skincare),
    Product(name='Ultra Violette',
            description="Skin Type: Combination, Dry, Normal, Oily, Sensitive\nSkin Concerns: Dryness, Dullness, Oiliness, Uneven Skin Texture, Uneven Skin Tone\nFormulation: Liquid\nSkincare By Age: 20s, 30s, 40s, 50+, Under 20",
            image='products/spf.png',
            price=39.99, 
            category=skincare),
    Product(name='Haus Labs by Lady Gaga Volumizing + Lengthening Mascara • 8ml',
            description="Function: Lengthen, Volumize\nBenefits: Long-wearing\nWhat it is:\nA biotech-enhanced mascara that delivers 5X fanned-out volume that’s nourishing and lengthening, never clumpy or flaky, and safe for sensitive eyes.",
            image='products/eye.png',
            price=47.99, 
            category=skincare),
]

db.session.add_all(products)
db.session.commit()

print("Database created and seeded with sample products.")
