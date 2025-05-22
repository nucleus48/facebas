import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore } from "tinybase/with-schemas";
import { usePersistence } from "./use-persistence";

const ValuesSchema = {
  attendanceId: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  lastSession: { type: "string" },
  fieldsJson: { type: "string", default: "[]" },
} as const;

const TablesSchema = {
  admin: { userId: { type: "string" } },
  session: { start: { type: "number" }, end: { type: "number" } },
  attendance: { sessionId: { type: "string" }, userId: { type: "string" } },
  user: {
    userId: { type: "string" },
    facialEmbedding: { type: "string", default: "[]" },
    dataJson: { type: "string", default: "{}" },
  },
} as const;

export const {
  useCreateMergeableStore,
  useProvideStore,
  useStore: useAttendanceStore,
  useValue: useAttendanceValue,
  useCell: useAttendanceCell,
  useHasRow: useAttendanceHasRow,
  useRowCount: useAttendanceRowCount,
  useResultRowCount: useAttendanceResultRowCount
} = UiReact as UiReact.WithSchemas<[typeof TablesSchema, typeof ValuesSchema]>;

export interface AttendanceStoreProps {
  attendanceId: string;
  initialContentJson?: string;
}

export default function AttendanceStore({
  attendanceId,
  initialContentJson,
}: AttendanceStoreProps) {
  const store = useCreateMergeableStore(() => {
    return createMergeableStore(attendanceId).setSchema(
      TablesSchema,
      ValuesSchema
    );
  }, [attendanceId]);

  usePersistence(attendanceId, store, initialContentJson);
  useProvideStore(attendanceId, store);

  return null;
}
