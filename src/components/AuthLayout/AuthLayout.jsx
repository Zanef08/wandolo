import styles from "./AuthLayout.module.scss"

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      {children}
    </div>
  )
}

export default AuthLayout
