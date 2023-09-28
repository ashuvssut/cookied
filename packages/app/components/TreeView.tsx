import { FCC } from "app/types/IReact"; // FCC = Functional Component with children prop
import { View } from "dripsy";
import Re, { withSpring, useAnimatedStyle } from "react-native-reanimated";
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
	const [wrapperMaxHt, setWrapperMaxHt] = useState(0);
	const [collapse, setCollapse] = useState(isCollapsed);

	const rHeight = useAnimatedStyle(() => {
		const config = { damping: 15 };
		const allowCollapse = collapse && !!wrapperMinHt;
		if (allowCollapse) return { height: withSpring(wrapperMinHt, config) };
		return { height: withSpring(wrapperMaxHt, config) };
	}, [collapse, wrapperMinHt, wrapperMaxHt]);

	return (
		<Re.View style={[rHeight, { overflow: "hidden", width: "100%" }]}>
			<View
				onLayout={e => setWrapperMaxHt(e.nativeEvent.layout.height)}
				sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}
			>
				<View onLayout={e => setWrapperMinHt(e.nativeEvent.layout.height)}>
					{node(setCollapse)}
				</View>
				{childNodes}
				{childLeafs}
			</View>
		</Re.View>
	);
};
