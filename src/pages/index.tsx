import styled from "styled-components";
import { ColorList } from "../shared";

function Home() {
  return (
    <Container>
      <InputForm>
        <div className="input-section">
          <header>
            <span>승리</span>
          </header>
          <div className="input">
            <select name="" id="">
              <option value="1">영환</option>
              <option value="2">티라미드</option>
              <option value="2">배고</option>
              <option value="3">파요</option>
              <option value="4">테스</option>
              <option value="5">1</option>
            </select>
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="0">0</option>
            </select>
          </div>
          <div className="input">
            <select name="" id="">
              <option value="1">영환</option>
              <option value="2">티라미드</option>
              <option value="2">배고</option>
              <option value="3">파요</option>
              <option value="4">테스</option>
              <option value="5">1</option>
            </select>
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="0">0</option>
            </select>
          </div>
        </div>
        <div className="input-section">
          <header>
            <span>패배</span>
          </header>
          <div className="input">
            <select name="" id="">
              <option value="1">영환</option>
              <option value="2">티라미드</option>
              <option value="2">배고</option>
              <option value="3">파요</option>
              <option value="4">테스</option>
              <option value="5">1</option>
            </select>
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="0">0</option>
            </select>
          </div>
          <div className="input">
            <select name="" id="">
              <option value="1">영환</option>
              <option value="2">티라미드</option>
              <option value="2">배고</option>
              <option value="3">파요</option>
              <option value="4">테스</option>
              <option value="5">1</option>
            </select>
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="0">0</option>
            </select>
          </div>
        </div>
        <button className="confirm">결과 입력하기</button>
        <div className="add-player">
          <input type="text" />
          <button>확인</button>
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
