# ScanDuplex
Your scanner can scan automatically stack of paper but not in duplex ? Here is the solution !

## Why ?
My scanner have a automatic document feeder (I think that's the way to say it in english, it's "Bac d'alimentation automatique", in french).

The thing is, I often need to scan loads of papers but both sides. I used to scan the odd page, then the even's ones.
After that, I extract each pages from theses two PDF into a directory, and then, I merge every pages in the right order : that's quite long and boring. I don't like that.

So I made this little web app.

My configuration is quite special, my scanner upload PDF of documents I scan in a FTP server (on my freebox : http://www.free.fr/adsl/freebox-revolution.html). So, this web application load the list of PDF there is on a specific folder on my FTP.

## How does it work ?
When you load the main page of this webapp, it will list you all PDFs there is in a specific remote FTP folder.

You'll choose two PDF documents, you say witch one represent odd pages, you press a button, and it's done, you can download the final PDF :)

## Requirment
NodeJS
Some npm modules (check packages.json)

Just run : ```npm install```

Also, make sure PDFtk is installed on your computer https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/
