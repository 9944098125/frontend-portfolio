import React from "react";
import Modal from "react-responsive-modal";

type Props = {
	showConfirmationModal: boolean;
	setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
};
const ConfirmationModal = (props: Props) => {
	const { showConfirmationModal, setShowConfirmationModal, handleLogout } =
		props;
	return (
		<React.Fragment>
			<Modal
				open={showConfirmationModal}
				onClose={() => setShowConfirmationModal(false)}
				center>
				<div className="p-10">
					<h3 className="text-3xl font-bold mb-5">
						Are you sure you want to Logout ?
					</h3>
					<div className="flex justify-between items-center px-5">
						<button
							onClick={handleLogout}
							className="bg-green-600 text-white px-6 py-2 hover:bg-green-800 border-none rounded-md">
							Yes
						</button>
						<button
							onClick={() => setShowConfirmationModal(false)}
							className="bg-red-600 text-white px-6 py-2 hover:bg-red-800 border-none rounded-md">
							No
						</button>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
};

export default ConfirmationModal;
