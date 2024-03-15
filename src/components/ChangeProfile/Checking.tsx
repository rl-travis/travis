import React from "react";
import styles from "./styles.module.scss";
import { debounce } from "@/utils/debounce";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Check, Loader2Icon, Plus } from "lucide-react";
import { i18nType } from "@/i18n/types";
export default function Checking({
  usernameValue,
  username,
  i18n,
}: {
  usernameValue: string;
  username: string;
  i18n: i18nType;
}) {
  const [isChecking, setIsChecking] = React.useState<boolean>(false);
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const checkUsername = useMutation(api.user.checkUsername);
  const debounceCheck = debounce(check, 200);

  async function check() {
    setIsBusy(
      await checkUsername({
        username: usernameValue,
      }),
    );
  }

  React.useEffect(() => {
    if (usernameValue.length >= 5 && usernameValue !== username) {
      setIsChecking(true);
      debounceCheck();
      setIsChecking(false);
    }
  }, [usernameValue]);
  return (
    <div className={styles.check}>
      {usernameValue.length >= 5 && (
        <>
          {isChecking && (
            <div className={styles.checking}>
              <Loader2Icon size={12} />
              <span>{i18n.profile.check}</span>
            </div>
          )}
          {isBusy && (
            <div className={styles.busy}>
              <Plus size={12} />
              <span>{i18n.profile.busy}</span>
            </div>
          )}
          {!isChecking && !isBusy && (
            <div className={styles.free}>
              <Check width={12} />
              <span>{i18n.profile.free}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
