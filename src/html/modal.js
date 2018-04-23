function modalContent(){

return(`<!-- Modal HTML -->

<div id="myModal" class="modal fade">

    <div class="modal-dialog modal-sm">

        <div class="modal-content">

            <div class="modal-header">

                <button type="button" class="close dism" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>

            <div class="modal-body">


            </div>

            <div class="modal-footer">

                <button id="dismisB" type="button" class="btn btn-default dism" data-dismiss="modal">Cancel</button>

                <button id="AcceptB" type="button" class="btn btn-prim" data-dismiss="modal"></button>

            </div>

        </div>

    </div>

</div>
`);
}

export default modalContent;