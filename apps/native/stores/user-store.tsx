import { useAuth } from "@/providers/auth-provider";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import AttendanceStore from "./attendance-store";
import { usePersistence } from "./use-persistence";

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
} = UiReact as UiReact.WithSchemas<[typeof TablesSchema, NoValuesSchema]>;

export default function UserStore() {
  const { user } = useAuth();

  const store = useCreateMergeableStore(() => {
    return createMergeableStore(user.uid).setTablesSchema(TablesSchema);
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
