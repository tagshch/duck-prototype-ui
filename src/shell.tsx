import * as React from "react";

// import "xterm/css/xterm.css";
// import styles from './shell.module.css';

import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";
import { FileList } from "./filelist";
import { JSONInsertOptions } from "@duckdb/duckdb-wasm/dist/types/src/bindings";

// @ts-ignore: Unreachable code error
BigInt.prototype['toJSON'] = function () {
  return this.toString()
}

function toObject(res: any): any {
  return JSON.parse(JSON.stringify(res, (key, value) =>
    typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  ));
}

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js",
      import.meta.url
    ).toString(),
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js",
      import.meta.url
    ).toString(),
  },
};

let db: duckdb.AsyncDuckDB;

type ShellProps = {
  // token: string;
};

const Shell: React.FC<ShellProps> = (props: ShellProps) => {
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);
  const [infoText, setInfoText] = React.useState<string>("");
  const [currentTable, setCurrentTable] = React.useState<string>("");
  const [calculations, setCalculations] = React.useState<string>("");

  // if (!props.token) {
  //   return null;
  // }

  // 1 start duckdb
  React.useEffect(() => {
    // if (!Boolean(props.token)) {
    //   return;
    // }

    setInfoText("starting db...");

    (async () => {
      const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
      const logger = new duckdb.ConsoleLogger();
      const worker = new Worker(bundle.mainWorker!);

      db = new duckdb.AsyncDuckDB(logger, worker);

      await db.instantiate(bundle.mainModule);

      const conn = await db.connect();
      await conn.query('INSTALL json;');
      await conn.query('LOAD json;');
      await conn.close();

      setDbLoaded(true);
      setInfoText("ready!");
    })();
  }, [
    // props.token
  ]);

  // start working
  React.useEffect(() => {
    if (!dbLoaded) {
      return;
    }

    setInfoText("ready!");
  }, [dbLoaded]);

  return (
    <div style={{ margin: 20 }}>
      <div style={{ textAlign: "right", paddingRight: 20 }}>
        <span style={{ color: "white", paddingRight: 40 }}>{infoText}</span>

        <span style={{ color: "white", paddingRight: 20 }}>{"Your name"}</span>

        <button onClick={() => {
          localStorage.removeItem("AUTH_TOKEN");
          location.pathname = "/";

          setDbLoaded(false)
        }}>Logout</button>
      </div>

      <FileList
        // token={props.token}
        handleSubmit={async (record) => {
          setCurrentTable("loading...");

          const conn = await db.connect();

          const options: JSONInsertOptions = {
            create: true,
            name: record.table,
          };

          await conn.insertJSONFromPath(record.url, options)
          await conn.close();

          setCurrentTable(record.table);
        }}
      />

      <br />

      <div>
        <span style={{ paddingRight: 20 }}>Current table: {currentTable}</span>
      </div>

      <br />

      <div>
        <button onClick={async () => {
          let results = [];
          let res;
          const conn = await db.connect();

          res = await conn.query(`SELECT COUNT(*) FROM '${currentTable}'`);
          results.push(toObject(res.toArray()[0]));

          res = await conn.query(`SELECT COUNT(DISTINCT hash) FROM '${currentTable}'`);
          results.push(toObject(res.toArray()[0]));

          res = await conn.query(`SELECT COUNT(DISTINCT authorObject.fullname) FROM '${currentTable}'`);
          results.push(toObject(res.toArray()[0]));

          res = await conn.query(`SELECT SUM(audienceCount) FROM '${currentTable}' WHERE type != 'Комментарий'`);
          results.push(toObject(res.toArray()[0]));

          // TODO - need to fix message format, current viewsCount is a string!
          // res = await conn.query(`SELECT SUM(viewsCount) FROM '${currentTable}' WHERE hub != 'ok.ru'`);
          // results.push(toObject(res.toArray()[0]));

          res = await conn.query(`SELECT AVG(er) FROM '${currentTable}'`);
          results.push(toObject(res.toArray()[0]));

          res = await conn.query(`SELECT * FROM '${currentTable}' LIMIT 1`);
          results.push(toObject(res.toArray()[0]));

          setCalculations(JSON.stringify(results, null, 4));

          await conn.close();
        }}>Calculate</button>
      </div>

      <br />

      <pre>{calculations}</pre>
    </div>
  )
};

export default Shell;