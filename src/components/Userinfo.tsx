export type User = {
  name: string;
  email: string;
};

export default function Userinfo({ name, email }: User) {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
    </tr>
  );
}
