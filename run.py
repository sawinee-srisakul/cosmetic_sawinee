from sawineecosmetic import create_app

napp = create_app()  # Create the app globally

if __name__ == '__main__':
    napp.run(debug=True)
