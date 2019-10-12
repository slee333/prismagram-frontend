import React from "react"; 
import styled from "styled-components"; 
 
import { 
  ADD_POST
} from "../Components/Post/PostQueries";
import TextareaAutosize from "react-autosize-textarea";
import { useMutation } from "react-apollo-hooks";
import useInput from "../Hooks/useInput";
import { toast } from "react-toastify"; 

const Textarea = styled(TextareaAutosize)`
border: none;
width: 100%;
resize: none;
font-size: 14px;
&:focus {
  outline: none;
}
`;


export default () => {

  const captionInput = useInput("");

  const filearray = ["test"];

  //const [selectedFile, setSelectedFile] = useState(null);
  var selectedFile = null;
  const addPostMutation = useMutation(ADD_POST, {
    variables: {
      caption: captionInput.value,
      files: filearray,
      location: "location"
    }
    //variables: { caption: caption, files: files, location: location }
  });

  const onClickHandler = () => {
    // const data = new FormData();
    console.log(captionInput.value);
    // data.append("file", selectedFile);
    // axios
    //   .post("http://localhost:4000/upload", data, {
    //     // receive two    parameter endpoint url ,form data
    //   })

    //   .then(res => {
    //     // then print response status
    //     console.log(res.data);
    //   });
    
  };
  
  const onChangeHandler = event => {
    console.log(event.target.files[0]);
    //setSelectedFile(event.target.files[0]);
    selectedFile = event.target.files[0];
    console.log(selectedFile);
  };

  const handleChange = async event => {
    const { which } = event;

    if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addPostMutation();

        //await useMutation(ADD_POST, {
        //variables: { caption: "comment", files: "bbb", location: "ccc" }});

        captionInput.setValue(""); // 그리고 코멘트 창을 지웁니다.
      } catch (e) {
        toast.error("Cant send comment");
        console.log(e);
      }
    }
  };
  return (
    <div>
      <form>
        <label>
          What's on your mind?
          <div>
            <Textarea
              onKeyPress={handleChange}
              placeholder={"Add something..."}
              // onChange={handleSubmit()}
              value={captionInput.value}
              onChange={captionInput.onChange}
            />
          </div>
          <div>
            <input type="file" name="file" onChange={onChangeHandler} />
          </div>
        </label>
        <button
          type="button"
          class="btn btn-success btn-block"
          onClick={onClickHandler}
        >
          Upload
        </button>
      </form>
    </div>
  );
};
