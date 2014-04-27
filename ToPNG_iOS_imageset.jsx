/**********************************************************

ADOBE SYSTEMS INCORPORATED
Copyright 2005 Adobe Systems Incorporated
All Rights Reserved

NOTICE:  Adobe permits you to use, modify, and
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.
If you have received this file from a source
other than Adobe, then your use, modification,
or distribution of it requires the prior
written permission of Adobe.

*********************************************************/

/**********************************************************

ExportDocsAsPNG24.jsx

DESCRIPTION

This sample gets files specified by the user from the
selected folder and batch processes them and saves them
as PDFs in the user desired destination with the same
file name.

**********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pngExportOpts;

// Select the source folder.
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator file(s) you want to convert to PNG', '~' );

// If a valid folder is selected
if ( sourceFolder != null )
{
    files = new Array();
    fileType = prompt( 'Select type of Illustrator files to you want to process. Eg: *.ai', ' ' );

    // Get all files matching the pattern
    files = sourceFolder.getFiles( fileType );

    if ( files.length > 0 )
    {
        // Get the destination to save the files
        destFolder = Folder.selectDialog( 'Select the folder where you want to save the converted PNG files.', '~' );
        for ( i = 0; i < files.length; i++ )
        {
            saveToRes(files[i], 120.0, '@2x', 'iPhone');
            saveToRes(files[i], 60.0, '', 'iPhone');
            saveToRes(files[i], 152.0, '@2x', 'iPad');
            saveToRes(files[i], 76.0, '', 'iPad');
            saveToRes(files[i], 512.0, '', 'iTunesArtwork');
            saveToRes(files[i], 1024.0, '', 'iTunesArtwork');
            saveToRes(files[i], 80.0, '@2x', 'Spotlight');
            saveToRes(files[i], 40.0, '', 'Spotlight');
            saveToRes(files[i], 58.0, '@2x', 'Settings');
            saveToRes(files[i], 29.0, '', 'Settings');
        }
        alert( 'Files are saved as PNG in ' + destFolder );
    }
    else
    {
        alert( 'No matching files found' );
    }
}

function saveToRes(file, resolution, postfix, dirName) {

    sourceDoc = app.open(file); // returns the document object

    // Call function getNewName to get the name and file to save the pdf
    targetFile = getNewName(postfix, dirName);

    // Call function getPNGOptions get the PNGExportOptions for the files
    pngExportOpts = getPNGOptions(resolution);

    // Export as PNG
    sourceDoc.exportFile( targetFile, ExportType.PNG24, pngExportOpts );

    // Close
    sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
}


/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName(postfix, dirName)
{
    var ext, docName, newName, saveInFile, docName, folderName;
    docName = sourceDoc.name;
    ext = postfix + '.png'; // new extension for png file
    newName = "";

    for ( var i = 0 ; docName[i] != "." ; i++ )
    {
        newName += docName[i];
    }
    var filename = newName.replace('_pantone', '');

    if (dirName.length > 0) {
        folderName = dirName;
    }
    else {
        folderName = filename + ".imageset";
    }


    filename += ext; // full png name of the file

    var fileFolder = new Folder(destFolder + "/" + folderName);
    if(!fileFolder.exists) fileFolder.create();

    // Create a file object to save the png
    saveInFile = new File( destFolder + '/' + folderName + '/' + filename );

    return saveInFile;
}




/*********************************************************

getPNGOptions: Function to set the PNG saving options of the
files using the PDFSaveOptions object.

**********************************************************/

function getPNGOptions(scale)
{

    // Create the PDFSaveOptions object to set the PDF options
    var pngExportOpts = new ExportOptionsPNG24();

    // Setting PNGExportOptions properties. Please see the JavaScript Reference
    // for a description of these properties.
    // Add more properties here if you like
    pngExportOpts.antiAliasing = true;
    pngExportOpts.artBoardClipping = true;
    pngExportOpts.horizontalScale = scale;
    //pngExportOpts.matte = true;
    //pngExportOpts.matteColor = 0, 0, 0;
    pngExportOpts.saveAsHTML = false;
    pngExportOpts.transparency = true;
    pngExportOpts.verticalScale = scale;

    return pngExportOpts;
}

