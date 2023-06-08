import { bmShelfAction } from "app/store/slices/bmShelfSlice";
import { store } from "app/store/store";

const bmShelfEntities = {
	entities: {
		bookmarks: {
			"efa0a75b-a7f7-4c47-835d-0793e5f3d043": {
				id: "efa0a75b-a7f7-4c47-835d-0793e5f3d043",
				parentId: "691b3fd5-2799-400c-b319-ac82788d0603",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"efa0a75b-a7f7-4c47-835d-0793e5f3d043",
				],
				level: 0,
				title: "beggar psst because eyeball where",
				url: "https://illiterate-unibody.info",
				createdAt: "2023-06-07T17:40:54.975Z",
				updatedAt: "2023-06-07T17:40:54.975Z",
			},
			"e93b145e-ed01-4d1f-9f00-ffa2cc2eb221": {
				id: "e93b145e-ed01-4d1f-9f00-ffa2cc2eb221",
				parentId: "2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"e93b145e-ed01-4d1f-9f00-ffa2cc2eb221",
				],
				level: 1,
				title: "um miserable severe wavy",
				url: "https://purple-accusation.net",
				createdAt: "2023-06-07T17:40:54.976Z",
				updatedAt: "2023-06-07T17:40:54.976Z",
			},
			"f066da06-1d6c-4746-a772-d148f3ea0d11": {
				id: "f066da06-1d6c-4746-a772-d148f3ea0d11",
				parentId: "6e253c32-5987-4692-a665-ba4a80a3d91e",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"6e253c32-5987-4692-a665-ba4a80a3d91e",
					"f066da06-1d6c-4746-a772-d148f3ea0d11",
				],
				level: 2,
				title: "subedit upon tragic report",
				url: "https://odd-trade.name",
				createdAt: "2023-06-07T17:40:54.977Z",
				updatedAt: "2023-06-07T17:40:54.977Z",
			},
			"ce605a2a-0272-4b95-87e4-7b303c3892b0": {
				id: "ce605a2a-0272-4b95-87e4-7b303c3892b0",
				parentId: "6e253c32-5987-4692-a665-ba4a80a3d91e",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"6e253c32-5987-4692-a665-ba4a80a3d91e",
					"ce605a2a-0272-4b95-87e4-7b303c3892b0",
				],
				level: 2,
				title: "either space rag doll",
				url: "https://backward-quick.co",
				createdAt: "2023-06-07T17:40:54.977Z",
				updatedAt: "2023-06-07T17:40:54.977Z",
			},
			"95c445ff-7927-44c7-891e-43d07c8229db": {
				id: "95c445ff-7927-44c7-891e-43d07c8229db",
				parentId: "6e253c32-5987-4692-a665-ba4a80a3d91e",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"6e253c32-5987-4692-a665-ba4a80a3d91e",
					"95c445ff-7927-44c7-891e-43d07c8229db",
				],
				level: 2,
				title: "dissatisfy anyone hobo",
				url: "https://towering-carbon.org",
				createdAt: "2023-06-07T17:40:54.977Z",
				updatedAt: "2023-06-07T17:40:54.977Z",
			},
			"c71c8d84-76c9-41e9-a82d-040d9e4a2a81": {
				id: "c71c8d84-76c9-41e9-a82d-040d9e4a2a81",
				parentId: "6e253c32-5987-4692-a665-ba4a80a3d91e",
				type: "bookmark",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"6e253c32-5987-4692-a665-ba4a80a3d91e",
					"c71c8d84-76c9-41e9-a82d-040d9e4a2a81",
				],
				level: 2,
				title: "soon reality progress",
				url: "https://abandoned-discovery.biz",
				createdAt: "2023-06-07T17:40:54.977Z",
				updatedAt: "2023-06-07T17:40:54.977Z",
			},
		},
		folders: {
			"6e253c32-5987-4692-a665-ba4a80a3d91e": {
				id: "6e253c32-5987-4692-a665-ba4a80a3d91e",
				parentId: "2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
				type: "folder",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
					"6e253c32-5987-4692-a665-ba4a80a3d91e",
				],
				level: 2,
				title: "approach attribute document",
				createdAt: "2023-06-07T17:40:54.975Z",
				updatedAt: "2023-06-07T17:40:54.975Z",
			},
			"691b3fd5-2799-400c-b319-ac82788d0603": {
				id: "691b3fd5-2799-400c-b319-ac82788d0603",
				parentId: "root",
				type: "folder",
				path: ["root", "691b3fd5-2799-400c-b319-ac82788d0603"],
				level: 0,
				title: "year outside heat",
				createdAt: "2023-06-07T17:40:54.974Z",
				updatedAt: "2023-06-07T17:40:54.974Z",
			},
			"2b604167-7fd7-45e8-afaa-1a9d70d1df9e": {
				id: "2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
				parentId: "691b3fd5-2799-400c-b319-ac82788d0603",
				type: "folder",
				path: [
					"root",
					"691b3fd5-2799-400c-b319-ac82788d0603",
					"2b604167-7fd7-45e8-afaa-1a9d70d1df9e",
				],
				level: 1,
				title: "cruelty interview minority",
				createdAt: "2023-06-07T17:40:54.974Z",
				updatedAt: "2023-06-07T17:40:54.974Z",
			},
		},
	},
	rootFolderId: "root",
};

// execute addManyBm action on bmShelfEntities as payload
export const execAddMany = () => {
	store.dispatch(
		bmShelfAction.addManyBm(
			Object.keys(bmShelfEntities.entities.bookmarks).map(
				id => bmShelfEntities.entities.bookmarks[id],
			),
		),
	);
};

export const execAddManyFl = () => {
	store.dispatch(
		bmShelfAction.addManyFl(
			Object.keys(bmShelfEntities.entities.folders).map(
				id => bmShelfEntities.entities.folders[id],
			),
		),
	);
};
