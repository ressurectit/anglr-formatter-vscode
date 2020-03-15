import {AnglrFormatter} from 'anglr-formatter';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) 
{
	let config = vscode.workspace.getConfiguration('anglr');

	if(config.get('format.enable'))
	{
		vscode.languages.registerDocumentFormattingEditProvider('typescript', 
		{
			provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] 
			{
				if(!config.get('format.enable'))
				{
					return [];
				}

				let formatter = new AnglrFormatter(null,
				{
					reoderImports: config.get('importReorder.enable')
				});

				let changedSource = formatter.formatFileContent(document.getText());

				if(!changedSource)
				{
					return [];
				}

				let endPosition = document.lineAt(document.lineCount - 1).rangeIncludingLineBreak.end
				let startPosition = document.lineAt(0).rangeIncludingLineBreak.start;

				return [vscode.TextEdit.replace(new vscode.Range(startPosition, endPosition), changedSource)];
			}
		});
	}
}

export function deactivate()
{
}
