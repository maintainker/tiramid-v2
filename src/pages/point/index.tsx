import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { firedb } from "../../fbase";
import { ColorList } from "../../shared";

const totalYears = (() => {
  const thisYear = dayjs().year();
  const years = [];
  for (let i = thisYear; i >= 2021; i--) {
    years.push(String(i));
  }
  return years;
})();
function Point() {
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
  const users: { name: string; id: string; point: number }[] = [];
  for (let i = 0; i < logs.length; i++) {
    const win1Idx = users.findIndex((user) => user.id === logs[i].winner1.id);
    if (win1Idx < 0) {
      users.push({
        ...logs[i].winner1,
        point: logs[i].winner1_point,
      });
    } else {
      users[win1Idx].point += logs[i].winner1_point;
    }
    const win2Idx = users.findIndex((user) => user.id === logs[i].winner2.id);
    if (win2Idx < 0) {
      users.push({
        ...logs[i].winner2,
        point: logs[i].winner2_point,
      });
    } else {
      users[win2Idx].point += logs[i].winner2_point;
    }
    const lose1Idx = users.findIndex((user) => user.id === logs[i].loser1.id);
    if (lose1Idx < 0) {
      users.push({
        ...logs[i].loser1,
        point: -logs[i].loser1_point,
      });
    } else {
      users[lose1Idx].point -= logs[i].loser1_point;
    }
    const lose2Idx = users.findIndex((user) => user.id === logs[i].loser2.id);
    if (lose2Idx < 0) {
      users.push({
        ...logs[i].loser2,
        point: -logs[i].loser2_point,
      });
    } else {
      users[lose2Idx].point -= logs[i].loser2_point;
    }
  }
  users.sort((a, b) => b.point - a.point);
  return (
    <Container>
      <header>
        <span>이달의 계급도</span>
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
      <ul className="rank-container">
        <li className="rank heaven">
          <ul>
            <li>천계 ( 11 ~ )</li>
            {users
              .filter((el) => el.point >= 11)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
        <li className="rank kingdom">
          <ul>
            <li>왕족 ( 8 ~ 10 )</li>
            {users
              .filter((el) => el.point < 11 && el.point >= 8)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
        <li className="rank nobility">
          <ul>
            <li>귀족 ( 4 ~ 7 )</li>
            {users
              .filter((el) => el.point < 8 && el.point >= 4)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
        <li className="rank commons">
          <ul>
            <li>평민 ( 0 ~ 3 )</li>
            {users
              .filter((el) => el.point < 4 && el.point >= 0)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
        <li className="rank slave">
          <ul>
            <li>노예 ( -1 ~ -10 )</li>
            {users
              .filter((el) => el.point < 0 && el.point >= -10)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
        <li className="rank deep">
          <ul>
            <li>심해 ( -11 ~ )</li>
            {users
              .filter((el) => el.point < -10)
              .map((el) => (
                <li key={el.id}>
                  {el.name} {el.point} point
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </Container>
  );
}

export default Point;

const Container = styled.div`
  background: ${ColorList.black100};
  height: calc(100vh - 42px);
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  gap: 20px;
  header {
    font-size: 1.5em;
    font-weight: 500;
  }

  .select-container {
    padding: 0 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 8px;
  }
  .rank-container {
    width: 100%;
    padding: 0 20px;
    max-height: calc(100vh - 186px);
    overflow: scroll;
    .rank {
      padding: 12px;
      li {
        padding: 3px 0;
      }
      &.heaven {
        background: rgba(242, 184, 7, 0.3);
      }
      &.kingdom {
        background: rgba(9, 115, 104, 0.3);
      }
      &.nobility {
        background: rgba(242, 207, 184, 0.3);
      }
      &.commons {
        background: rgba(217, 79, 48, 0.3);
      }
      &.slave {
        background: rgba(242, 153, 169, 0.3);
      }
      &.deep {
        background: rgba(5, 20, 125, 0.3);
      }
    }
  }
`;
