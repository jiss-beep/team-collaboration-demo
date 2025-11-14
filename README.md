# Safe Grub - Allergy Detection Web App
Try it out! [SafeGrub](https://shiny-croissant-1456de.netlify.app/)
## Inspiration
Food allergies are a significant concern for individuals who need to carefully monitor their diet. Reading and understanding long ingredient labels can be time-consuming and challenging. Safe Grub is designed to assist individuals in quickly identifying potential allergens by allowing them to paste or type ingredient lists for instant analysis.
## What it does
Safe Grub is now a text-based tool that checks any provided ingredient list against a comprehensive local database of common allergens.

Text Input: Users paste an ingredient list (or any text) into a dedicated field.

Local Analysis: The app instantly parses the text, normalizing and checking every term against defined lists for "The Big Eight" allergens.

Instant Results: It provides a clear, immediate warning if any common allergens are detected.
## How we built it
Safe Grub is built as a single-page web application using HTML, CSS, and JavaScript. We utilized the following components:

Local Database: All common allergens are stored in hardcoded JavaScript Sets for instant lookup speed.

Text Parsing: Robust JavaScript functions handle unstructured text input, splitting ingredients by various delimiters (commas, parentheses, etc.) for accurate matching.

## Challenges we ran into
During the development of Safe Grub, we encountered one challenge:
- **Database Implementation:** We struggled to find a perfect database to store our food data for fetching and showing it to the users.

## Accomplishments that we're proud of
Despite the challenges, our team achieved several milestones throughout the development process:
- **Successful Barcode Detection:** We integrated the Clarifai API and implemented the barcode detection AI model, allowing us to accurately extract the serial number from the food wrapper image.
- **Allergen Identification:** By parsing through our ingredient database, we successfully identified potential allergens associated with the serial number.
- **Text-to-Speech Integration:** We implemented text-to-speech functionality, enabling Safe Grub to read the list of ingredients aloud, enhancing accessibility for visually impaired users.

## What we learned
This iteration focused heavily on the challenges of natural language processing and pattern matching within unstructured text. We prioritized creating a parsing routine that is resilient to common variations and formatting found on real-world ingredient labels.

## What's next for Safe Grub
Future enhancements could include:

Custom Allergen Profiles: Allowing users to save and check against their specific allergies beyond the standard "Big Eight."

Ingredient Highlighting: Visually highlighting the problematic ingredients directly in the input text area.

Dietary & Religious Filters: Expanding analysis to flag ingredients unsuitable for specific religious practices (e.g., Halal, Kosher) or dietary choices (e.g., Vegan, Vegetarian).

Medical Condition Checker: Adding custom profiles to detect ingredients that commonly trigger medical issues like GERD (Gastroesophageal Reflux Disease), IBS, or low-FODMAP diets.
