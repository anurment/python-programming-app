<script>
    import { userUuid } from "../stores/uuidStore";

const getPas = async () => {
      const response = await fetch(`/api/programming-assingment/user/${$userUuid}`);
      return await response.json();

    };

    let pasPromise = getPas();
</script>