import { View } from "dripsy";
import React from "react";

interface ITreeView<N, L> {
	treeData: { nodes: N[]; rootLeafs: L[] }; // TODO: infer automatically
	nodeArrKey: string;
	leafArrKey: string;
	renderNode: (node: N) => JSX.Element;
	renderLeaf: (node: L) => JSX.Element;
}

type TWithId = { $id: string };
export const TreeView = <N extends TWithId, L extends TWithId>(
	props: ITreeView<N, L>,
) => {
	const { treeData, nodeArrKey, leafArrKey, renderNode, renderLeaf } = props;
	const _renderTree = (tree: (typeof treeData)["nodes"]) => {
		return tree.map(node => {
			return (
				<React.Fragment key={node.$id}>
					{renderNode && renderNode(node)}
					{node[nodeArrKey] && _renderTree(node[nodeArrKey])}
					{node[leafArrKey] && _renderLeaf(node[leafArrKey])}
				</React.Fragment>
			);
		});
	};
	const _renderLeaf = (leaf: (typeof treeData)["rootLeafs"]) => {
		return leaf.map(node => {
			return (
				<React.Fragment key={node.$id}>
					{renderLeaf && renderLeaf(node)}
				</React.Fragment>
			);
		});
	};
	return (
		<View>
			{_renderTree(treeData["nodes"])}
			{_renderLeaf(treeData["rootLeafs"])}
		</View>
	);
};
