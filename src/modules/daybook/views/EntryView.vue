<template>
    <div class="entry d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold"> {{ dayMonthYear.day }} </span>
            <span class="mx-1 fs-3"> {{ dayMonthYear.month }} </span>
            <span class="mx-2 fs-4 fw-light"> {{ dayMonthYear.yearDay }} </span>
        </div>
        <div>
            <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpg"/>
            <button v-if="entry.id" @click="onDeleteEntry()"  class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button @click="onSelectImage()" class="btn btn-primary mx-2">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr/>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Que sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <Fab icon="fa-save" @on:click="saveEntry"/>
    <img v-if="localImage" :src="localImage" alt="entry-picture"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'
import Swal from 'sweetalert2'

   export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab'))
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        dayMonthYear() {
            const  { day, month, yearDay } = getDayMonthYear( this.entry.date )
            return { day, month, yearDay }
        }
    },
    methods: {
        loadEntry() {
            let entry;

            if(this.id == 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById( this.id )
                if(!entry) this.$router.push({  name: 'no-entry' })
            }
            this.entry = entry
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor :)',
                allowOutsideClick: false
            })
            Swal.showLoading()

            if(this.entry.id) {
                await this.updateEntry( this.entry )
            } else {
                const id = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id } })
            }

            Swal.fire('Guardado', 'Entrada registrada con éxito.', 'success')
        },
        async onDeleteEntry() {

            const { isConfirmed } =  await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Una vez borrado, no podrás recuperarlo.',
                showDenyButton: true,
                showConfirmButton: true
            })

            if(isConfirmed) {
                Swal.showLoading()
                await this.deleteEntry(this.entry.id)
                this.$router.push({ name: 'no-entry' })
                Swal.fire('Eliminado', '', 'success')
            }

        },  
        onSelectedImage(event){
            console.log(event)
            const file = event.target.files[0];
            if(!file){
                this.localImage = null
                this.file = null
                return
            } 
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
        },  
        onSelectImage() {
            this.$refs.imageSelector.click()
        },
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry'])
    },  
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
   }
</script>

<style lang="scss" scoped>
    textarea {
        font-size: 20px;
        border: none;
        height: 100%;

        &:focus {
            outline: none;
        }
    }
    img {
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>