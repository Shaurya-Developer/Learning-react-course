import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className=" text-right">
      <Button type={"primary"}>Make Priority</Button>
    </fetcher.Form> // fetcher.Form will submit the form and re-validate the form,revalidation means react-router knows the data have changed as a result of action, so it will again fetch the data and re-render the page
  );
}
export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
