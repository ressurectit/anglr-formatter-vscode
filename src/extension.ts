import {workspace, ExtensionContext, TextDocument, TextEdit, languages, Range} from 'vscode';
import {AnglrFormatter} from 'anglr-formatter';

import {getAnglrFormatter} from './utils';

export function activate(context: ExtensionContext) 
{
	if(workspace.getConfiguration('anglr').get('format.enable'))
	{
		languages.registerDocumentFormattingEditProvider('typescript', 
		{
			provideDocumentFormattingEdits: async (document: TextDocument) => 
			{
				let config = workspace.getConfiguration('anglr');

				//HACK - until i will know how to unregister formatter
				if(!config.get('format.enable'))
				{
					return [];
				}

				let anglrFormatter = config.get('localVersion.enable') ? (await getAnglrFormatter()) : AnglrFormatter;

				let formatter = new anglrFormatter(null,
				{
					reoderImports: config.get('importReorder.enable'),
					callExpressionArgumentsFormatter: config.get('callExpressionArgumentsFormatter.enable'),
					constructorParameterFormatter: config.get('constructorParameterFormatter.enable'),
					decoratorArgumentsFormatter: config.get('decoratorArgumentsFormatter.enable'),
					importFormatter: config.get('importFormatter.enable')
				});

				let changedSource = formatter.formatFileContent(document.getText(), !config.get('typescriptFormat.enable'));

				if(!changedSource)
				{
					return [];
				}

				let endPosition = document.lineAt(document.lineCount - 1).rangeIncludingLineBreak.end
				let startPosition = document.lineAt(0).rangeIncludingLineBreak.start;

				return [TextEdit.replace(new Range(startPosition, endPosition), changedSource)];
			}
		});
	}
}

export function deactivate()
{
}
