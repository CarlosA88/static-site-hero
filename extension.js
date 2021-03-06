'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require( 'vscode' );

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate( context ) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log( 'Congratulations, your extension "static-site-hero" is now active!' );



	let fileLinkDisposable = vscode.commands.registerCommand( 'extension.insertLink', () => {
		// vscode.window.showInformationMessage( "Insert File Link Initiated" )
		// InsertText( "Insert file link" )

		let linkTypeList = ['File', 'Image'];

		vscode.window.showQuickPick( linkTypeList, { placeHolder: 'Link Type' } ).then( result => {
			// insertText( result )

			if ( result === 'File' ) {
				insertText( getImageTemplate() );
			} else if ( result === 'Image' ) {
				insertText( getFileTemplate() )
			}

		} )


	} );
	context.subscriptions.push( fileLinkDisposable )

	let figureDisposable = vscode.commands.registerCommand( 'extension.insertFigure', () => {
		vscode.window.showInformationMessage( "Insert Figure tag Initiated" )
	} );
	context.subscriptions.push( figureDisposable )
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

let insertText = ( value ) => {
	let editor = vscode.window.activeTextEditor;

	if ( !editor ) {
		vscode.window.showErrorMessage( "Can't insert because no document is open." );
		return;
	}

	let selection = editor.selection;
	let range = new vscode.Range( selection.start, selection.end );

	editor.edit( ( editBuilder ) => {
		editBuilder.replace( range, value )
	} )
}
let getImageTemplate = () => {
	return vscode.workspace.getConfiguration( "staticSiteHero" )["imagePathTemplate"];
};

let getFileTemplate = () => {
	return vscode.workspace.getConfiguration( "staticSiteHero" )["filePathTemplate"];
};
module.exports = {
	activate,
	deactivate
}
