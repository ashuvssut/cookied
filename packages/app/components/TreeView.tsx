import { FCC } from "app/types/IReact"; // FCC = Functional Component with children prop
import { View } from "dripsy";
import React, { Dispatch, SetStateAction, useState } from "react";

type WithId<T> = T & { _id: string };

type NodeWithNodesProp<
	NKey extends string,
	LKey extends string,
	N extends WithId<NodeWithNodesAndLeafsProp<NKey, LKey, N, L>>,
	L extends WithId<{}>,
> = {
	[Nkey in NKey]: N[];
};

type NodeWithLeafsProp<LKey extends string, L extends WithId<{}>> = {
	[Lkey in LKey]: L[];
};

type NodeWithNodesAndLeafsProp<
	NKey extends string,
	LKey extends string,
	N extends WithId<NodeWithNodesAndLeafsProp<NKey, LKey, N, L>>,
	L extends WithId<{}>,
> = WithId<NodeWithNodesProp<NKey, LKey, N, L> & NodeWithLeafsProp<LKey, L>>;

interface ITreeView<
	NKey extends string,
	LKey extends string,
	N extends WithId<NodeWithNodesAndLeafsProp<NKey, LKey, N, L>>,
	L extends WithId<{}>,
> {
	treeData: {
		nodes: N[];
		rootLeafs: L[];
	};
	isCollapsed: boolean;
	nodeArrKey: NKey;
	leafArrKey: LKey;
	renderNode: (
		node: N,
		setCollapse: Dispatch<SetStateAction<boolean>>,
	) => JSX.Element;
	renderLeaf: (node: L) => JSX.Element;
}

export const TreeView = <
	NKey extends string,
	LKey extends string,
	N extends WithId<NodeWithNodesAndLeafsProp<NKey, LKey, N, L>>,
	L extends WithId<{}>,
>(
	props: ITreeView<NKey, LKey, N, L>,
) => {
	const { treeData, nodeArrKey, leafArrKey, renderNode, renderLeaf } = props;
	const _renderNodes = (nodesArr: (typeof treeData)["nodes"]) => {
		return nodesArr.map(node => {
			const nodeObj = node[nodeArrKey];
			const childNodes = nodeObj && _renderNodes(nodeObj);

			const leafObj = node[leafArrKey];
			const childLeafs = leafObj && _renderLeafs(leafObj);
			return (
				<TreeWrapper
					isCollapsed={props.isCollapsed}
					key={node._id}
					node={setCollapse => renderNode && renderNode(node, setCollapse)}
					childNodes={childNodes}
					childLeafs={childLeafs}
				/>
			);
		});
	};
	const _renderLeafs = (leaf: (typeof treeData)["rootLeafs"]) => {
		return leaf.map(node => {
			return (
				<React.Fragment key={node._id}>
					{renderLeaf && renderLeaf(node)}
				</React.Fragment>
			);
		});
	};
	return (
		<View>
			{_renderNodes(treeData["nodes"])}
			{_renderLeafs(treeData["rootLeafs"])}
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
