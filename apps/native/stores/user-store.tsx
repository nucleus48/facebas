import { useAuth } from "@/providers/auth-provider";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore } from "tinybase/with-schemas";
import AttendanceStore from "./attendance-store";
import { usePersistence } from "./use-persistence";

const ValuesSchema = {
  facialEmbedding: { type: "string", default: "[]" },
} as const;

const TablesSchema = {
  attendance: {
    attendanceId: { type: "string" },
    initialContentJson: { type: "string" },
  },
} as const;

export const {
  useCreateMergeableStore,
  useProvideStore,
  useTable,
  useStore: useUserStore,
  useRowIds: useUserRowIds,
} = UiReact as UiReact.WithSchemas<[typeof TablesSchema, typeof ValuesSchema]>;

export default function UserStore() {
  const { user } = useAuth();

  const store = useCreateMergeableStore(() => {
    return createMergeableStore(user.uid).setSchema(TablesSchema, ValuesSchema);
  }, [user.uid]);

  const attendanceTable = useTable("attendance", store);

  usePersistence(user.uid, store);
  useProvideStore(user.uid, store);

  return Object.entries(attendanceTable).map(
    ([attendanceId, { initialContentJson }]) => (
      <AttendanceStore
        key={attendanceId}
        attendanceId={attendanceId}
        initialContentJson={initialContentJson}
      />
    )
  );
}
