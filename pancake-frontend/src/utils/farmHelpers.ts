// TODO: Replace with real numbers
const ARCHIVED_FARMS_START_PID = -2
const ARCHIVED_FARMS_END_PID = -1

const isArchivedPid = (pid: number) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID

export default isArchivedPid
