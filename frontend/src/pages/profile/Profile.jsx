import "./profile.css";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfileModal from "./UpdateProfileModal";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";


const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id))
    window.scrollTo(0, 0);
  }, [id]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">upload</button>
          </form>
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
          hello my name is Youssef I am a web developer
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createAt).toDateString()}</span>
        </div>
        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && <UpdateProfileModal setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
