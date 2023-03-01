import styled from "styled-components";
import { ColorList } from "../../shared";

function Point() {
  return (
    <Container>
      <header>
        <span>이달의 계급도</span>
      </header>
      <ul className="rank-container">
        <li className="rank heaven">
          <ul>
            <li>천계 ( 11 ~ )</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
            <li>설영환 1 point</li>
          </ul>
        </li>
        <li className="rank kingdom">
          <ul>
            <li>왕족 ( 8 ~ 10 )</li>
          </ul>
        </li>
        <li className="rank nobility">
          <ul>
            <li>귀족 ( 4 ~ 7 )</li>
          </ul>
        </li>
        <li className="rank commons">
          <ul>
            <li>평민 ( 0 ~ 3 )</li>
          </ul>
        </li>
        <li className="rank slave">
          <ul>
            <li>노예 ( -1 ~ -10 )</li>
          </ul>
        </li>
        <li className="rank deep">
          <ul>
            <li>심해 ( -11 ~ )</li>
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
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
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
  .rank-container {
    width: 100%;
    padding: 0 20px;
    max-height: calc(100vh - 152px);
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
