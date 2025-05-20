import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { MergeableStore, OptionalSchemas, Store } from "tinybase/with-schemas";

export const usePersistence = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas> | Store<Schemas>,
  initialContentJson?: string
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    (store) =>
      createExpoSqlitePersister(
        store,
        SQLite.openDatabaseSync(storeId + ".db")
      ),
    [storeId, store],
    async (persister) => {
      await persister.load(
        initialContentJson && JSON.parse(initialContentJson)
      );
      await persister.startAutoSave();
    },
    [initialContentJson]
  );
