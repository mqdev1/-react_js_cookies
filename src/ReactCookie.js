const setCookie = (props) => {
  const Empty = [undefined, null, ""];

  if (Empty.indexOf(props.name) > -1) {
    console.error("property 'name' is undefined");
    return;
  }
  if (Empty.indexOf(props.value) > -1) {
    console.error("property 'value' is undefined");
    return;
  }
  if (Empty.indexOf(props.time) > -1) {
    console.error("property 'time' is undefined");
    return;
  }

  // get Cookie time
  // time per seccound
  // 60 is one minute
  const time = props.time || 60;

  // get cookie name
  const name = props.name || "";

  // get cookie value
  const value = props.value || "";

  const AllOfLocals = localStorage.getItem("AllLocals");
  if (AllOfLocals === null) {
    const localItem = {
      loc_name: name,
      loc_time: time,
      loc_value: value,
    };
    localStorage.setItem("AllLocals", JSON.stringify(localItem));
  } else {
    const AllOfLocalsOld = Array.from(JSON.parse(AllOfLocals));
    // update old cookie like name
    const cok_item = AllOfLocalsOld.filter((a) => a.loc_name === props.name);
    const localItem = {
      loc_name: name,
      loc_time: time,
      loc_value: value,
      loc_created_date: new Date(),
    };
    if (cok_item.length > 0) {
      cok_item[0].loc_value = value;
      cok_item[0].loc_time = time;
    } else {
      AllOfLocalsOld.push(localItem);
    }
    localStorage.setItem("AllLocals", JSON.stringify(AllOfLocalsOld));
  }
};

const getCookie = (props) => {
  const Empty = [undefined, null, ""];
  const AllOfLocals = localStorage.getItem("AllLocals");
  if (null === AllOfLocals) return null;
  if (Empty.indexOf(props.name) > -1) return null;
  const cookies = Array.from(JSON.parse(AllOfLocals));
  const cokie = cookies.filter((a) => a.loc_name === props.name);
  if (cokie.length > 0) {
    const nowDate = new Date();
    const currDate = new Date(cokie[0].loc_created_date);
    nowDate.setSeconds(nowDate.getSeconds() + parseInt(cokie[0].loc_time));
    if (nowDate > currDate) {
      console.log({
        ...cokie[0],
        finsh_date : nowDate
      });
      return cokie[0].loc_value;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const delCookie = (props) => {
  const Empty = [undefined, null, ""];
  const AllOfLocals = localStorage.getItem("AllLocals");
  if (null === AllOfLocals) return null;
  if (Empty.indexOf(props.name) > -1) return null;
  const cookies = Array.from(JSON.parse(AllOfLocals));
  const myCok = cookies.filter((a) => a.loc_name === props.name);
  const newCookiesList = [];
  cookies.forEach((co) => {
    if (co.loc_name !== myCok[0].loc_name) {
      newCookiesList.push(co);
    }
  });
  localStorage.setItem("AllLocals", JSON.stringify(newCookiesList));
};

const listCookies = () => {
  const AllOfLocals = localStorage.getItem("AllLocals");
  if (null === AllOfLocals) return [];
  const cookies = Array.from(JSON.parse(AllOfLocals));
  const l = [];
  cookies.forEach((n) => {
    const nowDate = new Date();
    const currDate = new Date(n.loc_created_date);
    nowDate.setSeconds(nowDate.getSeconds() + parseInt(n.loc_time));
    if (nowDate > currDate) {
      l.push({
        name: n.loc_name,
        value: n.loc_value,
        time: n.loc_time,
      });
    } else {
      delCookie({ name: n.loc_name });
    }
  });
  return l;
};

const ClearCookies = () => {
  localStorage.setItem("AllLocals", JSON.stringify([]));
};

export { listCookies, setCookie, getCookie, delCookie, ClearCookies };
