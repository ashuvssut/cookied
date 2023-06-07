// import { View, Text } from 'dripsy';

// const TreeNode = ({ node }) => {
//   console.log("Node","Level",node.level,node)
//   return (
//     <View sx={{backgroundColor:"green"}} key={node.id}>
//       <Text sx={{color:"yellow"}}>{node.name}</Text>
//       {node.bookmarks &&
//         node.bookmarks.map((bookmark, index) =>
//           bookmark ? (
//             <View sx={{backgroundColor:"aliceblue"}} key={index}>
//               <Text sx={{color:"red"}}>{bookmark.title}</Text>
//             </View>
//           ) : null
//         )}
//       {node.folders &&
//         node.folders.map((folder) => <TreeNode key={folder.id} node={folder} />)}
//     </View>
//   );
// };

// const TreeView = ({ data }) => {
//   console.log("Data",data)
//   return (
//     <View>
//       {data.folders.map((folder) => (
//         <TreeNode key={folder.id} node={folder} />
//       ))}
//     </View>
//   );
// };

// export default TreeView;
