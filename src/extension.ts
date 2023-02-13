import * as vscode from 'vscode';
import { openSettings }from './pups';

export function activate(context: vscode.ExtensionContext) {
	const loadPlugin = vscode.commands.registerCommand('chrome-plugin-loader.loadPlugin', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		const defaultUri = workspaceFolders?.length ? workspaceFolders[0].uri : undefined;
		const selectedPluginUri = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			canSelectMany: false,
			defaultUri,
			openLabel: 'Load Chrome extension'
		});
		
		if (!selectedPluginUri || !selectedPluginUri.length) {
			console.log('No URI provided');
			return;
		}

		const selectedWebpage = await vscode.window.showInputBox({
			title: 'Page to open in Chromium with your plugin',
			placeHolder: 'https://google.com',
		});

		await openSettings({
			extensionDirectory: selectedPluginUri[0].fsPath,
			urlPage: selectedWebpage,
		});

		vscode.window.showInformationMessage('Opening Chromium with extension loaded...');
	});

	context.subscriptions.push(loadPlugin);
}
