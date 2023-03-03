import dayjs from "dayjs";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { firedb } from "../fbase";
import { ColorList } from "../shared";

const thisYear = dayjs().year();
const thisMonth = dayjs().month() + 1;
const player = collection(firedb, `${thisYear}player`);
const logList = collection(firedb, `${thisYear}playlog`);
function Home() {
  const [players, setPlayers] = useState<{ name: string; id: string }[]>([]);
  const [win1, setWin1] = useState<undefined | string>();
  const [win2, setWin2] = useState<undefined | string>();
  const [lose1, setLose1] = useState<undefined | string>();
  const [lose2, setLose2] = useState<undefined | string>();
  const [win1Point, setWin1Point] = useState(1);
  const [win2Point, setWin2Point] = useState(1);
  const [lose1Point, setLose1Point] = useState(1);
  const [lose2Point, setLose2Point] = useState(1);
  const [newPlayer, setNewPlayer] = useState("");
  useEffect(() => {
    const getData = async () => {
      const rowData = await getDocs(player);
      const data = rowData.docs.map((el) => ({
        name: el.data().name,
        id: el.id,
      }));
      data.sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1));
      setPlayers(data);
      setWin1(data[0].id);
      setWin2(data[0].id);
      setLose1(data[0].id);
      setLose2(data[0].id);
    };
    getData();
  }, []);
  const addPlayer = async () => {
    if (!window.confirm(`이름이 ${newPlayer}이(가) 맞습니까?`)) return;
    if (players.findIndex((el) => el.name === newPlayer))
      return alert("해당플레이어가 존재합니다.");
    const collectionRef = collection(firedb, `${thisYear}player`);
    await addDoc(collectionRef, {
      name: newPlayer,
      win: 0,
      lose: 0,
      vs: [],
      team: [],
    });
    const getData = async () => {
      const rowData = await getDocs(collectionRef);
      const data = rowData.docs.map((el) => ({
        name: el.data().name,
        id: el.id,
      }));
      data.sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1));
      setPlayers(data);
      alert("추가완료");
    };
    getData();
  };
  const addLogs = async () => {
    if (win1Point + win2Point - lose1Point - lose2Point !== 0)
      return alert("합계가 맞지 않습니다!");
    if (prompt("티라미드 승패 입력을 위한 비밀암호") !== "태진")
      return alert("암호를 당장 알아오세요!");
    if (
      win1 === undefined ||
      win2 === undefined ||
      lose1 === undefined ||
      lose2 === undefined
    )
      return alert("플레이어가 선택되지 않았습니다.");
    const win1Doc = doc(firedb, `${thisYear}player`, win1);
    const win2Doc = doc(firedb, `${thisYear}player`, win2);
    const lose1Doc = doc(firedb, `${thisYear}player`, lose1);
    const lose2Doc = doc(firedb, `${thisYear}player`, lose2);
    // const
    try {
      const innerPlayers = (await Promise.allSettled([
        (await getDoc(win1Doc)).data() as playerType,
        (await getDoc(win2Doc)).data() as playerType,
        (await getDoc(lose1Doc)).data() as playerType,
        (await getDoc(lose2Doc)).data() as playerType,
      ])) as { status: string; value: playerType }[];
      innerPlayers[0].value.win++;
      innerPlayers[1].value.win++;
      innerPlayers[2].value.lose++;
      innerPlayers[3].value.lose++;

      const win1win2 = innerPlayers[0].value.team.findIndex(
        (el) => el.name === innerPlayers[1].value.name
      );
      if (
        innerPlayers[0].value.name === innerPlayers[1].value.name ||
        innerPlayers[1].value.name === "티라미드"
      ) {
      } else if (win1win2 < 0) {
        innerPlayers[0].value.team.push({
          lose: 0,
          win: 1,
          name: innerPlayers[1].value.name,
          id: win2,
        });
      } else {
        innerPlayers[0].value.team[win1win2].win++;
      }
      const win2win1 = innerPlayers[1].value.team.findIndex(
        (el) => el.name === innerPlayers[0].value.name
      );
      if (
        innerPlayers[0].value.name === innerPlayers[1].value.name ||
        innerPlayers[0].value.name === "티라미드"
      ) {
      } else if (win2win1 < 0) {
        innerPlayers[1].value.team.push({
          lose: 0,
          win: 1,
          name: innerPlayers[0].value.name,
          id: win1,
        });
      } else {
        innerPlayers[1].value.team[win2win1].win++;
      }
      const lose1lose2 = innerPlayers[2].value.team.findIndex(
        (el) => el.name === innerPlayers[3].value.name
      );
      if (
        innerPlayers[2].value.name === innerPlayers[3].value.name ||
        innerPlayers[3].value.name === "티라미드"
      ) {
      } else if (lose1lose2 < 0) {
        innerPlayers[2].value.team.push({
          lose: 1,
          win: 0,
          name: innerPlayers[3].value.name,
          id: lose2,
        });
      } else {
        innerPlayers[2].value.team[lose1lose2].lose++;
      }
      const lose2lose1 = innerPlayers[3].value.team.findIndex(
        (el) => el.name === innerPlayers[2].value.name
      );
      if (
        innerPlayers[2].value.name === innerPlayers[3].value.name ||
        innerPlayers[2].value.name === "티라미드"
      ) {
      } else if (lose2lose1 < 0) {
        innerPlayers[3].value.team.push({
          lose: 1,
          win: 0,
          name: innerPlayers[2].value.name,
          id: lose1,
        });
      } else {
        innerPlayers[3].value.team[lose2lose1].lose++;
      }
      const win1lose1 = innerPlayers[0].value.vs.findIndex(
        (el) => el.name === innerPlayers[2].value.name
      );
      if (
        innerPlayers[0].value.name === innerPlayers[2].value.name ||
        innerPlayers[2].value.name === "티라미드"
      ) {
      } else if (win1lose1 < 0) {
        innerPlayers[0].value.vs.push({
          name: innerPlayers[2].value.name,
          lose: 0,
          win: 1,
          id: lose1,
        });
      } else {
        innerPlayers[0].value.vs[win1lose1].win++;
      }

      const win1lose2 = innerPlayers[0].value.vs.findIndex(
        (el) => el.name === innerPlayers[3].value.name
      );
      if (
        innerPlayers[0].value.name === innerPlayers[3].value.name ||
        innerPlayers[3].value.name === "티라미드"
      ) {
      } else if (win1lose2 < 0) {
        innerPlayers[0].value.vs.push({
          name: innerPlayers[3].value.name,
          lose: 0,
          win: 1,
          id: lose2,
        });
      } else {
        innerPlayers[0].value.vs[win1lose2].win++;
      }
      const win2lose1 = innerPlayers[1].value.vs.findIndex(
        (el) => el.name === innerPlayers[2].value.name
      );
      if (
        innerPlayers[1].value.name === innerPlayers[2].value.name ||
        innerPlayers[2].value.name === "티라미드"
      ) {
      } else if (win2lose1 < 0) {
        innerPlayers[1].value.vs.push({
          name: innerPlayers[2].value.name,
          lose: 0,
          win: 1,
          id: lose1,
        });
      } else {
        innerPlayers[1].value.vs[win2lose1].win++;
      }

      const win2lose2 = innerPlayers[1].value.vs.findIndex(
        (el) => el.name === innerPlayers[3].value.name
      );
      if (
        innerPlayers[1].value.name === innerPlayers[3].value.name ||
        innerPlayers[3].value.name === "티라미드"
      ) {
      } else if (win2lose2 < 0) {
        innerPlayers[1].value.vs.push({
          name: innerPlayers[3].value.name,
          lose: 0,
          win: 1,
          id: lose2,
        });
      } else {
        innerPlayers[0].value.vs[win2lose2].win++;
      }
      const lose1win1 = innerPlayers[2].value.vs.findIndex(
        (el) => el.name === innerPlayers[0].value.name
      );
      if (
        innerPlayers[2].value.name === innerPlayers[0].value.name ||
        innerPlayers[0].value.name === "티라미드"
      ) {
      } else if (lose1win1 < 0) {
        innerPlayers[2].value.vs.push({
          name: innerPlayers[0].value.name,
          lose: 1,
          win: 0,
          id: win1,
        });
      } else {
        innerPlayers[2].value.vs[lose1win1].lose++;
      }

      const lose1win2 = innerPlayers[2].value.vs.findIndex(
        (el) => el.name === innerPlayers[1].value.name
      );
      if (
        innerPlayers[2].value.name === innerPlayers[1].value.name ||
        innerPlayers[1].value.name === "티라미드"
      ) {
      } else if (lose1win2 < 0) {
        innerPlayers[2].value.vs.push({
          name: innerPlayers[1].value.name,
          lose: 1,
          win: 0,
          id: win2,
        });
      } else {
        innerPlayers[2].value.vs[lose1win2].lose++;
      }
      const lose2win1 = innerPlayers[3].value.vs.findIndex(
        (el) => el.name === innerPlayers[0].value.name
      );
      if (
        innerPlayers[3].value.name === innerPlayers[0].value.name ||
        innerPlayers[0].value.name === "티라미드"
      ) {
      } else if (lose2win1 < 0) {
        innerPlayers[3].value.vs.push({
          name: innerPlayers[0].value.name,
          lose: 1,
          win: 0,
          id: win1,
        });
      } else {
        innerPlayers[3].value.vs[lose2win1].lose++;
      }

      const lose2win2 = innerPlayers[3].value.vs.findIndex(
        (el) => el.name === innerPlayers[1].value.name
      );
      if (
        innerPlayers[3].value.name === innerPlayers[1].value.name ||
        innerPlayers[1].value.name === "티라미드"
      ) {
      } else if (lose2win2 < 0) {
        innerPlayers[3].value.vs.push({
          name: innerPlayers[1].value.name,
          lose: 1,
          win: 0,
          id: win2,
        });
      } else {
        innerPlayers[3].value.vs[lose2win2].lose++;
      }

      addDoc(logList, {
        loser1_point: lose1Point,
        loser2: players.find((el) => el.id === lose2),
        winner2: players.find((el) => el.id === win2),
        loser1: players.find((el) => el.id === lose1),
        month: thisMonth,
        loser2_point: lose2Point,
        year: thisYear,
        winner1_point: win1Point,
        winner1: players.find((el) => el.id === win1),
        timeStamp: dayjs().format("DDhhmm"),
        winner2_point: win2Point,
      });
      updateDoc(win1Doc, { ...innerPlayers[0].value });
      updateDoc(win2Doc, { ...innerPlayers[1].value });
      updateDoc(lose1Doc, { ...innerPlayers[2].value });
      updateDoc(lose2Doc, { ...innerPlayers[3].value });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container>
      <InputForm>
        <div className="input-section">
          <header>
            <span>승리</span>
          </header>
          <div className="input">
            <select
              name="win1"
              id="win1"
              placeholder="승자"
              onChange={(el) => setWin1(el.target.value)}
              value={win1}
            >
              {players.map((el) => (
                <option key={`win1-${el.id}`} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              value={win1Point}
              onChange={(e) => setWin1Point(Number(e.target.value))}
              name="win1-point"
              id="win1-point"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={0}>0</option>
            </select>
          </div>
          <div className="input">
            <select
              name="win2"
              id="win2"
              placeholder="승자"
              onChange={(el) => setWin2(el.target.value)}
              value={win2}
            >
              {players.map((el) => (
                <option key={`win2-${el.id}`} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              value={win2Point}
              onChange={(e) => setWin2Point(Number(e.target.value))}
              name="win2-point"
              id="win2-point"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={0}>0</option>
            </select>
          </div>
        </div>
        <div className="input-section">
          <header>
            <span>패배</span>
          </header>
          <div className="input">
            <select
              name="lose1"
              onChange={(el) => setLose1(el.target.value)}
              id="lose1"
              placeholder="패자"
              value={lose1}
            >
              {players.map((el) => (
                <option key={`lose1-${el.id}`} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              value={lose1Point}
              onChange={(e) => setLose1Point(Number(e.target.value))}
              name="lose1-point"
              id="lose1-point"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={0}>0</option>
            </select>
          </div>
          <div className="input">
            <select
              onChange={(el) => setLose2(el.target.value)}
              name="lose2"
              id="lose2"
              placeholder="패자"
              value={lose2}
            >
              {players.map((el) => (
                <option key={`lose2-${el.id}`} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              value={lose2Point}
              onChange={(e) => setLose2Point(Number(e.target.value))}
              name="lose2-point"
              id="lose2-point"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={0}>0</option>
            </select>
          </div>
        </div>
        <button className="confirm" onClick={addLogs}>
          결과 입력하기
        </button>
        <div className="add-player">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />
          <button onClick={addPlayer}>확인</button>
        </div>
      </InputForm>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  background: ${ColorList.black100};
  height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
const InputForm = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 30px 0;
  margin: 0 20px;
  .input-section {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    header {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 1.8em;
    }
    .input {
      display: flex;
      gap: 20px;
      justify-content: center;
      select {
        font-size: 1em;
        border: 0;
        padding: 8px;
      }
    }
  }
  .confirm {
    width: 100%;
    margin: 20px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid ${ColorList.black900};
    font-size: 1.1em;
    font-weight: 500;
  }
  .add-player {
    display: flex;
    gap: 30px;
    width: 100%;
    margin: 0 20px;
    input {
      border: none;
      border-bottom: 1px solid ${ColorList.black900};
      flex: 1;
      padding: 8px 12px;
      font-size: 1em;
    }
    button {
      padding: 8px;
    }
  }
`;
// const;
