<!--- title: ScanDuplex -->

(For the moment, it's not configurable)

# ScanDuplex
Your scanner can scan automatically stack of paper but not in duplex ? Here is the solution !

## Why ?
<!--- en -->
My scanner has an automatic document feeder (I think that's the way to say it in English, it's "Bac d'alimentation automatique", in French).

The thing is, I often need to scan loads of papers but both sides. I used to scan the odd pages, then the even's ones.
After that, I extract each page from these two PDF into a directory, and then, I merge every pages in the right order: that's quite long and boring. I don't like that.

So I made this little web app.
<!--- /en -->

My configuration is quite special, my scanner uploads PDF of documents I scan in a FTP server (on my freebox : http://www.free.fr/adsl/freebox-revolution.html). So, this web application loads the list of PDF there is on a specific folder on my FTP.

## How does it work ?
When you load the main page of this webapp, it will list you all PDFs there are in a specific remote FTP folder.

You'll choose two PDF documents, you tell which one represents odd pages, you press a button, and it's done, you can download the final PDF :)

## Requirements
NodeJS
Some npm modules (check packages.json)

Just run : ```npm install```

Also, make sure PDFtk is installed on your computer https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/
