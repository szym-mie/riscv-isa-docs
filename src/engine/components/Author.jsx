import { Show } from "solid-js";
import AccountTo from "./core/AccountTo";
import MailTo from "./core/MailTo";

const Author = (props) => {
  const obj = () => props.obj;

  return (
    <>
      <div class='author-cont'>
        <div class='picture'>
        </div>
        <div class='full_name'>
          <h4>{obj().full_name}</h4>
        </div>
        <div class='contact'>

          <Show when={typeof obj().email === 'string'}>
            <div>
              <MailTo email={obj().email} />
            </div>
          </Show>
          <Show when={typeof obj().github === 'string'}>
            <div>
              <AccountTo site='Github' host='https://github.com' user={obj().github} />
            </div>
          </Show>
        </div>
      </div>
    </>
  )
};

export default Author;
