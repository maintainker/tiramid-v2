import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { firedb } from "../../fbase";
import { ColorList } from "../../shared";
interface PlayerDataList extends PlayerType {
  id: string;
}
const thisYear = dayjs().year();
const player = collection(firedb, `${thisYear}player`);
function Info() {
  const [players, setPlayers] = useState<PlayerDataList[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<null | string>(null);
  useEffect(() => {
    const getData = async () => {
      const rowData = await getDocs(player);
      const data = rowData.docs.map((el) => ({
        ...(el.data() as PlayerType),
        id: el.id,
      }));
      data.sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1));
      setPlayers(data);
    };
    getData();
  }, []);
  const thisPlayer = players.find((el) => el.id === selectedPlayer);
  thisPlayer?.team.sort((a, b) =>
    a.name < b.name ? -1 : a.name === b.name ? 0 : 1
  );
  thisPlayer?.vs.sort((a, b) =>
    a.name < b.name ? -1 : a.name === b.name ? 0 : 1
  );
  return (
    <Container>
      <header>올해의 승률</header>
      <ul className="info-container">
        {players.map((el) => (
          <li>
            <span>{el.name}</span> <span>w:{el.win}</span>
            <span>l:{el.lose}</span>
            <span>
              승률:
              {el.win + el.lose === 0
                ? 0
                : Math.round((el.win / (el.win + el.lose)) * 1000) / 10}
              %
            </span>
            <button onClick={() => setSelectedPlayer(el.id)}>정보 확인</button>
          </li>
        ))}
      </ul>
      {selectedPlayer !== null && (
        <Modal>
          <div className="dim" onClick={() => setSelectedPlayer(null)} />
          <div className="user-info">
            <header>
              <h2>{thisPlayer?.name}의 정보</h2>
            </header>
            <div className="data-container">
              <ul className="data-list">
                <li className="title">팀 승률</li>
                {thisPlayer?.team.map((el) => (
                  <li key={`team-${el.id}`}>
                    <span>{el.name}</span>
                    <span>w: {el.win}</span>
                    <span>l: {el.lose}</span>
                    <span>
                      {el.win + el.lose === 0
                        ? 0
                        : Math.round((el.win / (el.win + el.lose)) * 1000) / 10}
                      %
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="data-list">
                <li className="title">적 승률</li>
                {thisPlayer?.vs.map((el, idx) => (
                  <li key={`vs-${el.id}-${idx}`}>
                    <span>{el.name}</span>
                    <span>w: {el.win}</span>
                    <span>l: {el.lose}</span>
                    <span>
                      {el.win + el.lose === 0
                        ? 0
                        : Math.round((el.win / (el.win + el.lose)) * 1000) / 10}
                      %
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
}

export default Info;

const Container = styled.div`
  background: ${ColorList.black100};
  height: calc(100vh - 42px);
  font-size: 16px;
  padding: 0 20px;
  > header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 1.8em;
    padding: 20px 0;
  }
  .info-container {
    background: #fff;
    padding: 8px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    height: calc(100vh - 139px);
    overflow: scroll;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .dim {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .user-info {
    > header {
      text-align: center;
      margin-bottom: 12px;
    }
    width: calc(100vw - 40px);
    height: 500px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 8px;
    overflow: scroll;
    .data-container {
      display: flex;
      justify-content: space-between;
    }
    .data-list {
      width: calc((100% - 24px) / 2);
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      li {
        display: flex;
        justify-content: space-between;
        &.title {
          font-size: 16px;
          margin: 0 auto 4px;
          text-align: center;
        }
      }
    }
  }
`;
