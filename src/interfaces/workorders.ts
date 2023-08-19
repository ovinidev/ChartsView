interface ChecklistItem {
	completed: boolean;
	task: string;
}

export interface WorkOrder {
	assetId: number;
	assignedUserIds: number[];
	checklist: ChecklistItem[];
	description: string;
	id: number;
	priority: string;
	status: string;
	title: string;
}
