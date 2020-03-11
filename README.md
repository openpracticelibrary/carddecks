# version & changelog
This is version 3.4.4

Changes since version 3.4.3:
- Addressed issues
	- #39 removing visioning card from the deck




# carddecks
This repository includes working and printing materials used to edit and print card decks for the Open Practice Library. It includes the print ready as well as editable files for cards, tuck box and leaflet insert. The files are organized in the directories working_files and print_ready_files. If you simply want to print the decks, please use the versions in print_ready_files in contact with your printer - these Adobe Illustrator files have been prepared for printing with the text converted to outlines. If you want to edit the files it is better to use the copies in working_files, where the Adobe Illustrator files have editable text.



# Updating card files
You will need Adobe Illustrator (or similar) with license to edit the files and customise the content. Please make sure to follow the below process when making any changes:
1. Always edit the file "working_files/cards - layout.ai"
2. When you're done editing, save the file.
3. Select all objects and convert all text to outlines (Menu Type / Create Outlines). NB! Do NOT save the file at this point!
4. Choose Menu File / Save As... to save the file as a copy in the print_ready_files directory. Name the file "cards - layout - print - v.X.Y.ai", where "X.Y" is the next version. For smaller changes, just increment the Y by one, for larger changes, increment X and reset Y to 0. For minor changes outside the actual product files (e.g. small changes in the readme file), just add a Z-version number, e.g. 3.4.1.
5. Convert the print ready .ai file to pdf and also save it in the print_ready_files directory, with the same name except for the .pdf suffix.
7. Update README.md with the correct version number and replace the "changes since last version" with a clear description of what you changed.
6. Commit and push your change and issue a Pull Request.



# carddecks - api
To generate unique QR codes for each practice, call the QR code api. It will return a list of URLS pointing to the QR code that's been gernerated.
```
$ curl https://vibrant-wright-758ba4.netlify.com/.netlify/functions/qr/qrcode

OR to specify the size of QR code in pixels (defaults to '[100]x[100]'):
$ curl https://vibrant-wright-758ba4.netlify.com/.netlify/functions/qr/qrcode?size=[50]x[50]
```

To generate a JSON or CSV of the metadata from each practice call the following end point
```
$ curl https://vibrant-wright-758ba4.netlify.com/.netlify/functions/app/data\?type\=json

OR
$ curl https://vibrant-wright-758ba4.netlify.com/.netlify/functions/app/data\?type\=csv > all-data.csv
```



# Printing cards
When working with printing companies, the spec below is what has been used to order card decks.

description - Personalised both sides. Printed full Colour & Plastic Coated. Cut to shape, collated in to decks. Cello wrapping not included. Poker card sized 16 page leaflet, printed double sided on 110gsm silk art. Inserted in to personalised tuck boxes printed full colour on 350gsm Zanta Box Board matt laminated.

Size -88 x 63mm with radius corners.

Specification:
- 79 Cards per pack.
- Cello wrapping not included.
- Artwork supplied by client to fit our templates in PDF Format.
- Printing: Full Colour and Plastic Coated.
- Material: Heretic 305gsm Black Cored Playing Card Board.
- Instruction Leaflets: No leaflet
- Tuck Boxes: Inserted in to personalised tuck boxes printed full colour on 350gsm Zanta Box Board matte laminated.
