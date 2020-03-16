import {WorkspaceFolder, QuickPickItem, window, workspace} from 'vscode';
import {AnglrFormatter} from 'anglr-formatter';
import * as path from 'path';
import * as fs from 'fs';

export interface WorkspaceFolderItem extends QuickPickItem
{
    folder: WorkspaceFolder;
}

export type AnglrFormatterType = typeof AnglrFormatter;

export async function getAnglrFormatter(): Promise<AnglrFormatterType>
{
    const readonlyFolders = workspace.workspaceFolders;

    if (!readonlyFolders) 
    {
        return AnglrFormatter;
    }

    const folders = readonlyFolders.map(itm => itm);
    const folder = await pickFolder(folders, 'Select a workspace folder which should be used for finding local anglr-formatter');

    if(!folder)
    {
        return AnglrFormatter;
    }

    const folderRootPath = folder.uri.fsPath;
    const requirePath = path.join(folderRootPath, 'node_modules', 'anglr-formatter', 'dist', 'index.js');

    if(!fs.existsSync(requirePath))
    {
        return AnglrFormatter;
    }

    const anglrFormatterNamespace = require(requirePath);

    if(!anglrFormatterNamespace['AnglrFormatter'])
    {
        return AnglrFormatter;
    }

    return anglrFormatterNamespace['AnglrFormatter'];
}

export async function pickFolder(folders: WorkspaceFolder[], placeHolder: string): Promise<WorkspaceFolder | undefined>
{
    if (folders.length === 1)
    {
        return Promise.resolve(folders[0]);
    }

    const selected = await window.showQuickPick(folders.map<WorkspaceFolderItem>(folder => 
                                                                                 {
                                                                                     return {
                                                                                         label: folder.name,
                                                                                         description: folder.uri.fsPath,
                                                                                         folder: folder
                                                                                     };
                                                                                 }),
                                                {placeHolder: placeHolder});
    if (selected === undefined)
    {
        return undefined;
    }

    return selected.folder;
}
