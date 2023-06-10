import { FCC } from "app/types/IReact";
import { View } from "dripsy";
import React, { Dispatch, SetStateAction, useState } from "react";

interface ITreeView<N, L> {
	treeData: { nodes: N[]; rootLeafs: L[] };
	isCollapsed: boolean;
	nodeArrKey: string;
	leafArrKey: string;
	renderNode: (
		node: N,
		setCollapse: Dispatch<SetStateAction<boolean>>,
	) => JSX.Element;
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
				<TreeWrapper
					isCollapsed={props.isCollapsed}
					key={node.$id}
					node={setCollapse => renderNode && renderNode(node, setCollapse)}
					childNodes={node[nodeArrKey] && _renderTree(node[nodeArrKey])}
					childLeafs={node[leafArrKey] && _renderLeaf(node[leafArrKey])}
				/>
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

interface ITreeWrapper {
	isCollapsed: boolean;
	node: (setCollapse: Dispatch<SetStateAction<boolean>>) => JSX.Element;
	childNodes: JSX.Element[];
	childLeafs: JSX.Element[];
}
const TreeWrapper: FCC<ITreeWrapper> = props => {
	const { node, childNodes, childLeafs, isCollapsed } = props;
	const [wrapperMinHt, setWrapperMinHt] = useState(0);
	const [collapse, setCollapse] = useState(isCollapsed);
	const allowCollapse = collapse && !!wrapperMinHt;
	const wrapperHt = allowCollapse ? wrapperMinHt : "auto";
	// TODO: animate height change
	return (
		<View style={{ height: wrapperHt, overflow: "hidden" }}>
			<View onLayout={e => setWrapperMinHt(e.nativeEvent.layout.height)}>
				{node(setCollapse)}
			</View>
			{childNodes}
			{childLeafs}
		</View>
	);
};
