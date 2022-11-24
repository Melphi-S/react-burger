import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register, getUserInfo } from "../../services/actions/user";
import { Link, useHistory } from "react-router-dom";
import styles from "./Profile.module.scss";

const Profile = () => {
  return (
    <div className={`${styles.container}`}>

    </div>
  );
};

export default Profile;
