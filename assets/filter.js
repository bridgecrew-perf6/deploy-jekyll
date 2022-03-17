window.onload = async () => {

    let filterUsersinput = document.getElementById('filter_users');
    let linksList = document.getElementById("users-list");

    var users = await getPathNames();

    let filterUsers = function (event) {
        let keyword = event.target.value.toLowerCase();
        let filtered_users = [];
        if (keyword) {
            filtered_users = users.filter((user) => user.DisplayName.toLowerCase().indexOf(keyword) > -1);
        }
        renderLinks(filtered_users);

        function renderLinks(lists) {
            let li = "";
            for (index in lists) {
                li += `<li class="list-group-item" ><a  href="${location.origin + "/docs" + lists[index].URL}">${lists[index].DisplayName}</a> </li>`
            }
            linksList.innerHTML = li;
        }
    }
    filterUsersinput.addEventListener('keyup', filterUsers);

    async function getPathNames() {
        let url = "/docs/DocsRoutes.xlsx";
        let response = await fetch(url);
        if (response.status === 200) {
            let arrayBuffer = await response.arrayBuffer();
            let data = new Uint8Array(arrayBuffer);
            let arr = new Array();
            for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            let bstr = arr.join("");
            let workbook = XLSX.read(bstr, { type: "binary" });
            let first_sheet_name = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[first_sheet_name];
            return XLSX.utils.sheet_to_json(worksheet, { raw: true })
        }
        return [];
    }
};