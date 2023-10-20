import CreateDataGroup from "@/Components/CreateDataGroup";
import InputError from "@/Components/InputError";
import Item from "@/Components/Item";
import LoadExcelForm from "@/Components/LoadExcelForm";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Datas({ auth, workspace }) {
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [showExcelForm, setShowExcelForm] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Groups
                </h2>
            }
        >
            <Head title="Datas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap gap-1 flex-row-reverse">
                                <PrimaryButton
                                    className="block h-full"
                                    onClick={() => setShowGroupForm(true)}
                                >
                                    Create Group
                                </PrimaryButton>
                                <PrimaryButton
                                    className="block h-full"
                                    onClick={() => setShowExcelForm(true)}
                                >
                                    Load Excel
                                </PrimaryButton>
                            </div>
                            <div className="mt-4 flex flex-col gap-1">
                                {workspace.datas.map((data) => (
                                    <Item
                                        key={data.id}
                                        text={data.title}
                                        url={route("workspaces.datas.show", [
                                            workspace.id,
                                            data.id,
                                        ])}
                                    />
                                ))}
                            </div>
                            {workspace.excels && (
                                <div className="mt-4 flex flex-col gap-1">
                                    <h3>Excels</h3>
                                    {workspace.excels.map((excel) => (
                                        <Item
                                            key={excel.id}
                                            text={excel.name}
                                            actions={
                                                <button
                                                    className="inline-flex justify-items-center justify-center hover:bg-slate-400 cursor-pointer rounded p-1"
                                                    onClick={() =>
                                                        router.get(
                                                            route(
                                                                "workspaces.excels.show",
                                                                [
                                                                    workspace.id,
                                                                    excel.id,
                                                                ]
                                                            )
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                        />
                                                    </svg>
                                                </button>
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showGroupForm}>
                <CreateDataGroup
                    workspace={workspace}
                    setShowModal={setShowGroupForm}
                />
            </Modal>
            <Modal show={showExcelForm}>
                <LoadExcelForm
                    workspace={workspace}
                    setShowModal={setShowExcelForm}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
