import { useState, useEffect } from 'react';
import SheetDB from 'sheetdb-js';
import Link from 'next/link';
import {
  Alert,
  Button,
  Input,
  Radio,
  Textarea,
} from '@material-tailwind/react';
import data from '../data/data.json';

const aippm = data.aippm;
const ls = data.ls;
const ccc = data.ccc;
const uncsw = data.uncsw;
const ecosoc = data.ecosoc;
const disec = data.disec;
const wto = data.wto;
const unodc = data.unodc;
const ip = data.ip;

const id = Math.floor(100000 + Math.random() * 900000);

export default function Register() {
  const [error, setError] = useState(true);
  const [error1, setError1] = useState(true);
  const [check, setCheck] = useState(false);
  const [member, setMember] = useState(false);
  const [solo, setSolo] = useState(true);

  const useEmailValidation = (email) => {
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    return isEmailValid;
  };
  // phone no. validation
  // const usePhoneValidation = (phone) => {
  //   const isPhoneValid = /^\d{10}$/.test(phone);
  //   return isPhoneValid;
  // };
  const [formInput, setFormInput] = useState({
    Event_ID: id,
    Name: '',
    Age: 0,
    Gender: '',
    City: '',
    Country: '',
    Institute_Name: '',
    Mobile_Number: '',
    Email_ID: '',
    Referral_Code: '',
    No_of_MUNs: '',
    List_of_previous_MUNs: '',
    Awards_in_previous_MUNs: '',
    Committee_Preference_1: '',
    Committee_Preference_2: '',
    Committee_Preference_3: '',
    Committee_1_Country_Preference_1: '',
    Committee_1_Country_Preference_2: '',
    Committee_1_Country_Preference_3: '',
    Committee_2_Country_Preference_1: '',
    Committee_2_Country_Preference_2: '',
    Committee_2_Country_Preference_3: '',
    Committee_3_Country_Preference_1: '',
    Committee_3_Country_Preference_2: '',
    Committee_3_Country_Preference_3: '',
  });
  const [formInput2, setFormInput2] = useState({
    Event_ID: id,
    Name: '',
    Age: 0,
    Gender: '',
    City: '',
    Country: '',
    Institute_Name: '',
    Mobile_Number: '',
    Email_ID: '',
    Referral_Code: '',
    No_of_MUNs: '',
    List_of_previous_MUNs: '',
    Awards_in_previous_MUNs: '',
    Committee_Preference_1: '',
    Committee_Preference_2: '',
    Committee_Preference_3: '',
    Committee_1_Country_Preference_1: '',
    Committee_1_Country_Preference_2: '',
    Committee_1_Country_Preference_3: '',
    Committee_2_Country_Preference_1: '',
    Committee_2_Country_Preference_2: '',
    Committee_2_Country_Preference_3: '',
    Committee_3_Country_Preference_1: '',
    Committee_3_Country_Preference_2: '',
    Committee_3_Country_Preference_3: '',
  });

  const isEmailValid1 = useEmailValidation(formInput.Email_ID);
  const isEmailValid2 = useEmailValidation(formInput2.Email_ID);
  // const isPhoneValid1 = usePhoneValidation(formInput.Mobile_Number);
  // const isPhoneValid2 = usePhoneValidation(formInput2.Mobile_Number);

  const handleSubmit = (event) => {
    if (member == true && error1 == false) {
      SheetDB.write('https://sheetdb.io/api/v1/5zuibpea3tlr7', {
        sheet: "MASTERSHEET'23",
        data: formInput,
      })
        .then((result) => {
          event.preventDefault();
          event.target.reset();
        })
        .catch((err) => console.log(err));

      SheetDB.write('https://sheetdb.io/api/v1/5zuibpea3tlr7', {
        sheet: "MASTERSHEET'23",
        data: formInput2,
      })
        .then((result) => {
          event.preventDefault();
          event.target.reset();
        })
        .catch((err) => console.log(err));

      setFormInput({
        Event_ID: id,
        Name: '',
        Age: 0,
        Gender: '',
        City: '',
        Country: '',
        Institute_Name: '',
        Mobile_Number: '',
        Email_ID: '',
        Referral_Code: '',
        No_of_MUNs: '',
        List_of_previous_MUNs: '',
        Awards_in_previous_MUNs: '',
        Committee_Preference_1: '',
        Committee_Preference_2: '',
        Committee_Preference_3: '',
        Committee_1_Country_Preference_1: '',
        Committee_1_Country_Preference_2: '',
        Committee_1_Country_Preference_3: '',
        Committee_2_Country_Preference_1: '',
        Committee_2_Country_Preference_2: '',
        Committee_2_Country_Preference_3: '',
        Committee_3_Country_Preference_1: '',
        Committee_3_Country_Preference_2: '',
        Committee_3_Country_Preference_3: '',
      });
      setFormInput2({
        Event_ID: id,
        Name: '',
        Age: 0,
        Gender: '',
        City: '',
        Country: '',
        Institute_Name: '',
        Mobile_Number: '',
        Email_ID: '',
        Referral_Code: '',
        No_of_MUNs: '',
        List_of_previous_MUNs: '',
        Awards_in_previous_MUNs: '',
      });
    } else if (member == false && error1 == false) {
      SheetDB.write('https://sheetdb.io/api/v1/5zuibpea3tlr7', {
        sheet: "MASTERSHEET'23",
        data: formInput,
      })
        .then((result) => {
          event.preventDefault();
          event.target.reset();
        })
        .catch((err) => console.log(err));

      setFormInput({
        Event_ID: id,
        Name: '',
        Age: 0,
        Gender: '',
        City: '',
        Country: '',
        Institute_Name: '',
        Mobile_Number: '',
        Email_ID: '',
        Referral_Code: '',
        No_of_MUNs: '',
        List_of_previous_MUNs: '',
        Awards_in_previous_MUNs: '',
        Committee_Preference_1: '',
        Committee_Preference_2: '',
        Committee_Preference_3: '',
        Committee_1_Country_Preference_1: '',
        Committee_1_Country_Preference_2: '',
        Committee_1_Country_Preference_3: '',
        Committee_2_Country_Preference_1: '',
        Committee_2_Country_Preference_2: '',
        Committee_2_Country_Preference_3: '',
        Committee_3_Country_Preference_1: '',
        Committee_3_Country_Preference_2: '',
        Committee_3_Country_Preference_3: '',
      });
    } else {
      alert(
        'Form not submitted .Please follow instructions in the red alert box'
      );
    }
  };

  const handleCheck = (e) => {
    if (error == false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  useEffect(() => {
    if (member == true) {
      if (
        formInput2.Name === '' ||
        formInput2.Age === '0' ||
        formInput2.Gender === '' ||
        formInput2.City === '' ||
        formInput2.Country === '' ||
        formInput2.Institute_Name === '' ||
        formInput2.Mobile_Number === '' ||
        formInput2.Email_ID === '' ||
        formInput2.No_of_MUNs === '' ||
        formInput.Name === '' ||
        formInput.Age === '0' ||
        formInput.Gender === '' ||
        formInput.City === '' ||
        formInput.Country === '' ||
        formInput.Institute_Name === '' ||
        formInput.Mobile_Number === '' ||
        formInput.Email_ID === '' ||
        formInput.No_of_MUNs === '' ||
        isEmailValid1 == false ||
        isEmailValid2 == false
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [formInput, formInput2, member]);
  useEffect(() => {
    if (member == false) {
      if (
        formInput.Name === '' ||
        formInput.Age === '0' ||
        formInput.Gender === '' ||
        formInput.City === '' ||
        formInput.Country === '' ||
        formInput.Institute_Name === '' ||
        formInput.Mobile_Number === '' ||
        formInput.Email_ID === '' ||
        formInput.No_of_MUNs === '' ||
        isEmailValid1 == false
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [formInput, member]);
  useEffect(() => {
    if (
      formInput.Committee_Preference_1 === '' ||
      formInput.Committee_Preference_2 === '' ||
      formInput.Committee_Preference_3 === '' ||
      formInput.Committee_1_Country_Preference_1 === '' ||
      formInput.Committee_1_Country_Preference_2 === '' ||
      formInput.Committee_1_Country_Preference_3 === '' ||
      formInput.Committee_2_Country_Preference_1 === '' ||
      formInput.Committee_2_Country_Preference_2 === '' ||
      formInput.Committee_2_Country_Preference_3 === '' ||
      formInput.Committee_3_Country_Preference_1 === '' ||
      formInput.Committee_3_Country_Preference_2 === '' ||
      formInput.Committee_3_Country_Preference_3 === ''
    ) {
      setError1(true);
    } else {
      setError1(false);
    }
  }, [formInput]);

  const committees = [];

  data.registerCommittees.map((i) => {
    committees.push(i);
  });

  const [selected1, setSelected1] = useState('');

  const handleChange1 = (e) => {
    setSelected1(e.target.value);
    setFormInput({
      ...formInput,
      Committee_Preference_1: e.target.value,
    });
   
  };

  let type1 = null;
  let options1 = null;

  if (selected1 === 'AIPPM') {
    type1 = aippm;
  } else if (selected1 === 'CCC') {
    type1 = ccc;
  } else if (selected1 === 'UNCSW') {
    type1 = uncsw;
  } else if (selected1 === 'ECOSOC') {
    type1 = ecosoc;
  } else if (selected1 === 'DISEC') {
    type1 = disec;
  } else if (selected1 === 'WTO(Online)') {
    type1 = wto;
  }  else if (selected1 === 'International Press(Hybrid)') {
    type1 = ip;
  }

  if (type1) {
    options1 = type1.map((el) => <option key={el}>{el}</option>);
  }

  const [selected2, setSelected2] = useState('');

  const handleChange2 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_2: e.target.value,
    });
    setSelected2(e.target.value);
  };

  let type2 = null;
  let options2 = null;

  if (selected2 === 'AIPPM') {
    type2 = aippm;
  }  else if (selected2 === 'CCC') {
    type2 = ccc;
  } else if (selected2 === 'UNCSW') {
    type2 = uncsw;
  } else if (selected2 === 'ECOSOC') {
    type2 = ecosoc;
  } else if (selected2 === 'DISEC') {
    type2 = disec;
  } else if (selected2 === 'WTO(Online)') {
    type2 = wto;
  }  else if (selected2 === 'International Press(Hybrid)') {
    type2 = ip;
  }

  if (type2) {
    options2 = type2.map((el) => <option key={el}>{el}</option>);
  }

  const [selected3, setSelected3] = useState('');

  const handleChange3 = (e) => {
    setFormInput({
      ...formInput,
      Committee_Preference_3: e.target.value,
    });
    setSelected3(e.target.value);
  };

  let type3 = null;
  let options3 = null;

  if (selected3 === 'AIPPM') {
    type3 = aippm;
  }  else if (selected3 === 'CCC') {
    type3 = ccc;
  } else if (selected3 === 'UNCSW') {
    type3 = uncsw;
  } else if (selected3 === 'ECOSOC') {
    type3 = ecosoc;
  } else if (selected3 === 'DISEC') {
    type3 = disec;
  } else if (selected3 === 'WTO(Online)') {
    type3 = wto;
  } else if (selected3 === 'International Press(Hybrid)') {
    type3 = ip;
  }

  if (type3) {
    options3 = type3.map((el) => <option key={el}>{el}</option>);
  }

  return (
    <div className="bg-[url(../public/images/BG-1.svg)] h-full">
      <div className="pb-12">
        <div className={check ? 'hidden' : 'block'}>
          <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[3.5rem] pt-14">
            Delegate Application Form
          </p>
          <div className="place-items-center flex justify-center font-semibold text-center py-16">
            <div
              onClick={() => {
                setCheck(false);
              }}
              className="text-3xl text-[#FFFFFF] justify-center bg-[#1A1E21] w-10 h-10   border-2 border-[#1A1E21] rounded-full "
            >
              1
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div
              onClick={handleCheck}
              className="text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  "
            >
              2
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div className="  text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  ">
              3
            </div>
          </div>

          <div className="lg:w-3/4 mx-auto w-5/6 flex flex-col items-center justify-between space-y-10">
            <div className=" bg-[url(../public/images/Group-242.svg)] bg-no-repeat bg-center bg-auto bg-origin-padding grid grid-cols-1 place-items-center gap-20 lg:grid lg:grid-cols-2">
              <div className="flex flex-col space-y-8 w-full">
                <Input
                  size="lg"
                  label="Name *"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Name: e.target.value,
                    })
                  }
                />
                <Input
                  size="lg"
                  color="cyan"
                  label="Age *"
                  type="number"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Age: e.target.value,
                    })
                  }
                />
                <div className="mb-8">
                  <label className="text-[#189BA5] font-normal flex text-base mb-2">
                    Gender *
                  </label>
                  <div
                    className="flex gap-10"
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        Gender: e.target.value,
                      })
                    }
                  >
                    <Radio
                      name="type"
                      value="Female"
                      label="Female"
                      color="cyan"
                    />
                    <Radio name="type" label="Male" color="cyan" value="Male" />
                    <Radio
                      name="type"
                      value="Prefer_not_to_say"
                      label="Prefer not to say"
                      defaultChecked
                      color="cyan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-3">
                  <Input
                    size="lg"
                    label="City *"
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        City: e.target.value,
                      })
                    }
                  />
                  <Input
                    size="lg"
                    label="Country *"
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        Country: e.target.value,
                      })
                    }
                  />
                </div>
                <Input
                  size="lg"
                  label="Name of Institution *"
                  color="cyan"
                  type="text"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Institute_Name: e.target.value,
                    })
                  }
                />

                <Input
                  size="lg"
                  label="Mobile No. *"
                  type="number"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Mobile_Number: e.target.value,
                    })
                  }
                />
                <Input
                  size="lg"
                  label="E-mail *"
                  type="email"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Email_ID: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-8 w-full">
                <Input
                  label="CA Code (if any)"
                  size="lg"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Referral_Code: e.target.value,
                    })
                  }
                />
                <div className="text-lg text-[#189BA5] font-semibold">
                  Details of previous MUNs
                </div>
                <Input
                  size="lg"
                  label="No. of MUNs *"
                  color="cyan"
                  type="number"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      No_of_MUNs: e.target.value,
                    })
                  }
                />
                <Input
                  size="lg"
                  label="List of Previous MUNs"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      List_of_previous_MUNs: e.target.value,
                    })
                  }
                />
                <Textarea
                  label="Awards in Previous MUNs (if any)"
                  size="lg"
                  color="cyan"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      Awards_in_previous_MUNs: e.target.value,
                    })
                  }
                />
                {error && solo == true && (
                  <Alert
                    color="red"
                    variant="outlined"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                  >
                    Please fill all the required fields.Put all details in valid
                    format.
                  </Alert>
                )}
                <div className="flex flex-col items-center w-full">
                  {solo == true && (
                    <div
                      className={`flex flex-row justify-between items-center space-x-5 w-full ${solo ? 'block' : 'hidden'
                        }`}
                    >
                      <Link href="/home">
                        <Button
                          color="red"
                          className="w-full"
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </Link>

                      <Button
                        color="cyan"
                        className="w-full"
                        variant="outlined"
                        onClick={handleCheck}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {solo == false && (
                    <div
                      className={`flex flex-row justify-between items-center space-x-5 w-full ${solo ? 'hidden' : 'block'
                        }`}
                    >
                      <Button
                        className="w-full"
                        variant="outlined"
                        color="cyan"
                        onClick={() => {
                          setSolo(true);
                          setMember(false);
                        }}
                      >
                        Solo
                      </Button>
                    </div>
                  )}
                  {solo == true && (
                    <div
                      className={`flex flex-row justify-between items-center space-x-5 w-full ${solo ? 'block' : 'hidden'
                        }`}
                    >
                      <Button
                        className="w-full mt-3"
                        variant="outlined"
                        color="cyan"
                        onClick={() => {
                          setSolo(false);
                          setMember(true);
                          setError(true);
                        }}
                      >
                        DOUBLE DELEGATIONS
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`${member && solo == false ? 'block' : 'hidden'}`}>
              <h1 className="text-2xl font-semibold">Team Member</h1>
              <div className=" bg-[url(../public/images/Group-242.svg)] bg-no-repeat bg-center bg-auto bg-origin-padding grid grid-cols-1 place-items-center gap-20 lg:grid lg:grid-cols-2">
                <div className="flex flex-col space-y-8 w-full">
                  <Input
                    size="lg"
                    label="Name *"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Name: e.target.value,
                      })
                    }
                  />
                  <Input
                    size="lg"
                    color="cyan"
                    label="Age *"
                    type="number"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Age: e.target.value,
                      })
                    }
                  />
                  <div className="mb-8">
                    <label className="text-[#189BA5] font-normal flex text-base mb-2">
                      Gender *
                    </label>
                    <div
                      className="flex gap-10"
                      onChange={(e) =>
                        setFormInput2({
                          ...formInput2,
                          Gender: e.target.value,
                        })
                      }
                    >
                      <Radio
                        name="type1"
                        value="Female"
                        label="Female"
                        color="cyan"
                      />
                      <Radio
                        name="type1"
                        label="Male"
                        color="cyan"
                        value="Male"
                      />
                      <Radio
                        name="type1"
                        value="Prefer_not_to_say"
                        label="Prefer not to say"
                        defaultChecked
                        color="cyan"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-3">
                    <Input
                      size="lg"
                      label="City *"
                      onChange={(e) =>
                        setFormInput2({
                          ...formInput2,
                          City: e.target.value,
                        })
                      }
                    />
                    <Input
                      size="lg"
                      label="Country *"
                      onChange={(e) =>
                        setFormInput2({
                          ...formInput2,
                          Country: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Input
                    size="lg"
                    label="Name of Institution *"
                    color="cyan"
                    type="text"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Institute_Name: e.target.value,
                      })
                    }
                  />
                  <Input
                    maxLength={10}
                    size="lg"
                    label="Mobile No. *"
                    type="number"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Mobile_Number: e.target.value,
                      })
                    }
                  />
                  <Input
                    size="lg"
                    label="E-mail *"
                    type="email"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Email_ID: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-8 w-full">
                  <Input
                    label="Refferal Code (if any)"
                    size="lg"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Referral_Code: e.target.value,
                      })
                    }
                  />
                  <div className="text-lg text-[#189BA5] font-semibold">
                    Details of previous MUNs
                  </div>
                  <Input
                    size="lg"
                    label="No. of MUNs *"
                    color="cyan"
                    type="number"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        No_of_MUNs: e.target.value,
                      })
                    }
                  />
                  <Input
                    size="lg"
                    label="List of Previous MUNs"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        List_of_previous_MUNs: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    label="Awards in Previous MUNs (if any)"
                    size="lg"
                    color="cyan"
                    onChange={(e) =>
                      setFormInput2({
                        ...formInput2,
                        Awards_in_previous_MUNs: e.target.value,
                      })
                    }
                  />
                  {error && solo == false && (
                    <Alert
                      color="red"
                      variant="outlined"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      }
                    >
                      Please fill all the required fields. Put all details in
                      valid format.
                    </Alert>
                  )}
                  <div className="flex flex-row justify-between items-center space-x-5">
                    <Link href="/home">
                      <Button
                        color="red"
                        className={`w-full ${solo ? 'hidden' : 'block'}`}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      color="cyan"
                      className="w-full"
                      variant="outlined"
                      onClick={handleCheck}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ 'block'}>
          <p className="font-bold font-heading text-center text-[#1A1E21] text-xl sm:text-[4.5rem] pt-8 my-5 ">
            Delegate Application Form
          </p>
          <div className="place-items-center flex justify-center font-semibold text-center  pt-12 mb-12 mt-60px ">
            <div
              onClick={() => {
                setCheck(false);
              }}
              className="text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  "
            >
              1
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div
              onClick={() => {
                setCheck(true);
              }}
              className="text-3xl text-[#FFFFFF] justify-center bg-[#1A1E21] w-10 h-10   border-2 border-[#1A1E21] rounded-full "
            >
              2
            </div>
            <div className="w-40 mx-2 border h-0 justify-center border-[#1A1E21] my-6"></div>
            <div className="  text-3xl hover:text-[#FFFFFF] justify-center hover:bg-[#1A1E21] bg-[#FFFFFF] w-10 h-10   border-2 border-[#1A1E21] rounded-full  ">
              3
            </div>
          </div>

          <div className="flex flex-col sm:grid sm:grid-flow-col sm:grid-cols-3 items-center py-12 m-auto justify-items-center">
            <div>
              <p className=" text-center font-bold text-3xl mb-5">
                PORTFOLIO I
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>
                <select
                  name="Committee1"
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange1(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_1_Country_Preference_1: e.target.value,
                      });
                    }}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select
                    name="Option 2"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_1_Country_Preference_2: e.target.value,
                      });
                    }}
                  >
                    {options1}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select
                    name="Option 3"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_1_Country_Preference_3: e.target.value,
                      });
                    }}
                  >
                    {options1}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO II
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select
                  name="Committee1"
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange2(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_2_Country_Preference_1: e.target.value,
                      });
                    }}
                  >
                    {options2}
                  </select>
                </div>
              </div>{' '}
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select
                    name="Option 2"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_2_Country_Preference_2: e.target.value,
                      });
                    }}
                  >
                    {options2}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select
                    name="Option 3"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_2_Country_Preference_3: e.target.value,
                      });
                    }}
                  >
                    {options2}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 sm:mt-0 text-center font-bold text-3xl mb-5">
                PORTFOLIO III
              </p>
              <div className="w-72 pb-4">
                <p className="font-medium text-[#189BA5] flex py-2">
                  Select a committee
                </p>

                <select
                  name="Committee1"
                  className="w-72 p-2 rounded-lg"
                  onChange={(e) => {
                    handleChange3(e);
                  }}
                >
                  {committees.map((i) => {
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 1
                  </p>
                  <select
                    name="Option 1"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_3_Country_Preference_1: e.target.value,
                      });
                    }}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 2
                  </p>
                  <select
                    name="Option 2"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_3_Country_Preference_2: e.target.value,
                      });
                    }}
                  >
                    {options3}
                  </select>
                </div>
              </div>
              <div>
                <div className="w-72 pb-4">
                  <p className="font-medium text-[#189BA5] flex py-2">
                    Option 3
                  </p>
                  <select
                    name="Option 3"
                    className="w-72 p-2 rounded-lg"
                    onChange={(e) => {
                      setFormInput({
                        ...formInput,
                        Committee_3_Country_Preference_3: e.target.value,
                      });
                    }}
                  >
                    {options3}
                  </select>
                </div>
              </div>
            </div>
          </div>





          {error1 && (
            <Alert
              className=" m-auto justify-around w-max"
              color="red"
              variant="outlined"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 m-auto justify-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              Please fill all the required fields to be able to submit your
              form.
            </Alert>
          )}
          <div className="flex justify-center m-auto mt-3">
            <button
              onClick={() => {
                setCheck(false);
                setCheck(false);
              }}
              className="py-2 px-4 bg-black text-white rounded-lg w-32 mx-2"
            >
              Back
            </button>
            {error1 == false && (
              <Link href="thankyou">
                <Button onClick={handleSubmit} className="px-10">
                  Submit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}