import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ColorList } from "../../shared";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import { firedb } from "../../fbase";
interface LogType {
  loser1_point: number;
  loser2: {
    name: string;
    id: string;
  };
  winner2: {
    name: string;
    id: string;
  };
  loser1: {
    name: string;
    id: string;
  };
  month: number;
  loser2_point: number;
  year: number;
  winner1_point: number;
  winner1: {
    name: string;
    id: string;
  };
  timeStamp: string;
  winner2_point: number;
  id: string;
}
const totalYears = (() => {
  const thisYear = dayjs().year();
  const years = [];
  for (let i = thisYear; i >= 2021; i--) {
    years.push(String(i));
  }
  return years;
})();
function Log() {
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MM"));
  const [logs, setLogs] = useState<LogType[]>([]);
  useEffect(() => {
    const test = collection(firedb, `${selectedYear}playlog`);
    const getData = async () => {
      const q = await query(
        test,
        where("year", "==", Number(selectedYear)),
        where("month", "==", Number(selectedMonth))
      );
      const rowData = await getDocs(q);
      const data = rowData.docs.map((el) => ({
        ...(el.data() as Omit<LogType, "id">),
        id: el.id,
      }));
      data.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));
      setLogs(data);
    };
    getData();
  }, [selectedYear, selectedMonth]);
  const deleteDoc = (el: LogType) => {
    if (window.confirm(`시간 ${el.timeStamp}의 삭제가 맞나요?`)) {
      if (prompt("티라미드 승패 삭제을 위한 비밀암호") === "티츄")
        doc(firedb, `${selectedYear}playlog`, el.id);
    }
  };
  return (
    <Container>
      <header>
        <span>경기 로그</span>
      </header>
      <div className="select-container">
        <select
          name="year"
          id="year"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        >
          {totalYears.map((el) => (
            <option key={`year-${el}`} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
          name="month"
          id="month"
        >
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>
      <ul className="log-container">
        <li>
          <div>시간</div>
          <div>승리1</div>
          <div>승리2</div>
          <div>패배1</div>
          <div>패배2</div>
          <div className="button">삭제</div>
        </li>
        {logs.map((el) => (
          <li key={el.id}>
            <div>{el.timeStamp}</div>
            <div>{el.winner1.name}</div>
            <div>{el.winner2.name}</div>
            <div>{el.loser1.name}</div>
            <div>{el.loser2.name}</div>
            <button onClick={() => deleteDoc(el)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Log;

const Container = styled.div`
  background: ${ColorList.black100};
  height: calc(100vh - 42px);
  font-size: 16px;
  padding: 0 20px;
  header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 1.8em;
    padding: 20px 0;
  }
  .select-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 8px;
  }
  .log-container {
    width: 100%;
    background: white;
    height: calc(100vh - 184px);
    overflow: scroll;
    margin-top: 20px;
    padding: 8px;
    display: flex;
    gap: 5px;
    flex-direction: column;
    li {
      font-size: 14px;
      display: flex;
      > div {
        flex: 1;
        &.button {
          flex: 0.5;
        }
      }
      > button {
        flex: 0.5;
        background: none;
      }
      div,
      button {
        text-align: center;
        svg {
          width: 12px;
        }
      }
    }
  }
`;
