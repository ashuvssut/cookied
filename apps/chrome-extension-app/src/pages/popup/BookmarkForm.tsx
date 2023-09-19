import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { FormEvent, useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

export default function BookmarkForm() {
	const [bookmarkFolders, setBookmarkFolders] = useState([]);

	useEffect(() => {
		setBookmarkFolders(
			bookmarkFolders.filter(folder => folder !== "_no_folder_"),
		);
	}, []);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}
	return (
		<Stack gap={2}>
			<Typography variant="h4">Save Bookmark</Typography>
			<Stack component="form" gap={1.4} onSubmit={onSubmit}>
				<TextField
					id="bookmark-title"
					label="Title"
					fullWidth
					required
					size="small"
				/>

				<TextField
					id="bookmark-url"
					label="URL"
					fullWidth
					required
					size="small"
				/>

				<FormControl fullWidth>
					<InputLabel id="bookmark-folder">Bookmark Folder</InputLabel>
					<Select
						labelId="bookmark-folder"
						label="Bookmark Folder"
						value="_no_folder_"
						onChange={e => {
							const val = e.target.value;
							if (val === "_no_folder_") return;
						}}
						size="small"
					>
						<MenuItem value="_no_folder_">No folder</MenuItem>
						{bookmarkFolders.length > 0 && <Divider />}
						{bookmarkFolders.map(folder => {
							return <MenuItem value={folder}>{folder}</MenuItem>;
						})}
					</Select>
				</FormControl>

				<Box display="flex" gap={1.4} justifyContent="flex-end">
					<Button endIcon={<BookmarkRemoveIcon />} variant="text">
						Delete
					</Button>
					<Button
						type="submit"
						variant="contained"
						endIcon={<BookmarkAddIcon />}
					>
						Save
					</Button>
				</Box>
			</Stack>
			<Divider />
			<Button fullWidth endIcon={<OpenInNewIcon />}>
				All Bookmarks
			</Button>
		</Stack>
	);
}
