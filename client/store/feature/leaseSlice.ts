import {createSlice} from "@reduxjs/toolkit";
import {Lease, LeaseStatus} from "@/types/lease";

interface LeaseSlice {
    application: Lease[]
}

const initialState: LeaseSlice = {
    application: [
        {
            id: 1,
            propertyId: 1,
            startDate: "08 / 09 / 2024",
            endDate: "10 / 09 / 2024",
            status: LeaseStatus.ACTIVE,
        },
        {
            id: 2,
            propertyId: 2,
            startDate: "08 / 09 / 2024",
            endDate: "10 / 09 / 2024",
            status: LeaseStatus.PENDING,
        },
        {
            id: 3,
            propertyId: 3,
            startDate: "08 / 09 / 2024",
            endDate: "10 / 09 / 2024",
            status: LeaseStatus.INACTIVE,
        },]
}

const leaseSlice = createSlice({
        name: "leases",
        initialState,
        reducers: {}
    }
)

export const {} = leaseSlice.actions;
export default leaseSlice.reducer;