function modalContent(){

return(`<!-- Modal HTML -->

<div id="myModal" class="modal fade">

    <div class="modal-dialog modal-sm">

        <div class="modal-content">

            <div class="modal-header">

                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>

            <div class="modal-body">

              <form>

                <input id="input" type="text" class="form-control">

              </form>


            </div>

            <div class="modal-footer">

                <button id="dismisB" type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                <button id="saveB" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>

            </div>

        </div>

    </div>

</div>
`);
}

export default modalContent;