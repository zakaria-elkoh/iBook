import { useEffect, useState } from "react";
import { Download, Table as TableIcon, Trash2, Edit2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  deleteParticipant,
  updateParticipant,
} from "@/store/slices/participntSlice";
import { Toaster } from "./ui/toaster";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Participants = ({ participants, currentEvent }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: currentEvent?.title,
    location: currentEvent?.location,
  });
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = (participantId) => {
    dispatch(deleteParticipant(participantId));
  };

  const handleUpdate = (participant) => {
    dispatch(updateParticipant(participant));
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Add event details
      doc.setFontSize(16);
      doc.text("Event Details", 14, 15);
      doc.setFontSize(12);
      doc.text(`Event: ${eventDetails.title}`, 14, 25);
      doc.text(`Location: ${eventDetails.location}`, 14, 32);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 39);

      // Prepare table data
      const tableData = participants?.map((person) => [
        person.name,
        person.cni,
        formatDate(person.createdAt),
      ]);

      // Generate table
      doc.autoTable({
        head: [["Name", "CNI", "Registration Date"]],
        body: tableData || [],
        startY: 45,
        theme: "striped",
        headStyles: {
          fillColor: [66, 133, 244],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      // Save the PDF
      doc.save("participants-list.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You might want to show an error toast here
    }
  };

  return (
    <div className="p-4">
      <Toaster />

      <div className="space-x-4">
        <button
          onClick={() => setShowTable(!showTable)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
        >
          <TableIcon className="w-4 h-4 mr-2" />
          {showTable ? "Hide Table" : "Show Table"}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      {showTable && (
        <>
          <div className="mt-6 mb-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Event Details
            </h2>
            <div className="mt-2">
              <p className="text-gray-600">
                <span className="font-medium">Event:</span> {eventDetails.title}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span>{" "}
                {eventDetails.location}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    CNI
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {participants?.map((person, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {person.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {person.cni}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {formatDate(person.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(person._id)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          title="Edit participant"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(person._id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Delete participant"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Participants;
