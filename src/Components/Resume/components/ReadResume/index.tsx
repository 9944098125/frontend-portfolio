import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { RootState } from "../../../../Redux/Reducers";
import { useSelector } from "react-redux";
import { Icons } from "../../../../Utils/icons";

const AddResume = () => {
	const UserDetails = useSelector((state: RootState) => state.login);

	const docs = [{ uri: UserDetails?.user?.resume }];

	return (
		<React.Fragment>
			<div className="w-full lg:min-h-screen">
				{UserDetails?.user?.resume ? (
					<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
				) : (
					<Icons.Spinner className="w-10 h-10 animate-spin text-blue-600" />
				)}
			</div>
		</React.Fragment>
	);
};

export default AddResume;
