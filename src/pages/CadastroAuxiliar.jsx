import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import AreaTable from '@/components/AreaTable';
import AreaForm from '@/components/AreaForm';
import EscopoOrigemTable from '@/components/EscopoOrigemTable';
import EscopoOrigemForm from '@/components/EscopoOrigemForm';
import EscopoTipoTable from '@/components/EscopoTipoTable';
import EscopoTipoForm from '@/components/EscopoTipoForm';
import EspecialidadeTable from '@/components/EspecialidadeTable';
import EspecialidadeForm from '@/components/EspecialidadeForm';
import ExecutanteTable from '@/components/ExecutanteTable';
import ExecutanteForm from '@/components/ExecutanteForm';
import FamiliaEquipamentosTable from '@/components/FamiliaEquipamentosTable';
import FamiliaEquipamentosForm from '@/components/FamiliaEquipamentosForm';
import PlantaTable from '@/components/PlantaTable';
import PlantaForm from '@/components/PlantaForm';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [areas, setAreas] = useState([
    { ID: 1, TX_DESCRICAO: "Área 1", VL_QUANTIDADE_DIAS_EXECUCAO: 10 },
    { ID: 2, TX_DESCRICAO: "Área 2", VL_QUANTIDADE_DIAS_EXECUCAO: 15 },
    { ID: 3, TX_DESCRICAO: "Área 3", VL_QUANTIDADE_DIAS_EXECUCAO: 20 },
  ]);
  const [escopoOrigens, setEscopoOrigens] = useState([
    { ID: 1, TX_DESCRICAO: "Escopo Origem 1" },
    { ID: 2, TX_DESCRICAO: "Escopo Origem 2" },
    { ID: 3, TX_DESCRICAO: "Escopo Origem 3" },
  ]);
  const [escopoTipos, setEscopoTipos] = useState([
    { ID: 1, TX_DESCRICAO: "Escopo Tipo 1" },
    { ID: 2, TX_DESCRICAO: "Escopo Tipo 2" },
    { ID: 3, TX_DESCRICAO: "Escopo Tipo 3" },
  ]);
  const [especialidades, setEspecialidades] = useState([
    { ID: 1, TX_DESCRICAO: "Especialidade 1" },
    { ID: 2, TX_DESCRICAO: "Especialidade 2" },
    { ID: 3, TX_DESCRICAO: "Especialidade 3" },
  ]);
  const [executantes, setExecutantes] = useState([
    { ID: 1, TX_DESCRICAO: "Executante 1" },
    { ID: 2, TX_DESCRICAO: "Executante 2" },
    { ID: 3, TX_DESCRICAO: "Executante 3" },
  ]);
  const [familiaEquipamentos, setFamiliaEquipamentos] = useState([
    { ID: 1, TX_DESCRICAO: "Família de Equipamentos 1" },
    { ID: 2, TX_DESCRICAO: "Família de Equipamentos 2" },
    { ID: 3, TX_DESCRICAO: "Família de Equipamentos 3" },
  ]);
  const [plantas, setPlantas] = useState([
    { ID: 1, TX_DESCRICAO: "Planta 1" },
    { ID: 2, TX_DESCRICAO: "Planta 2" },
    { ID: 3, TX_DESCRICAO: "Planta 3" },
  ]);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [showEscopoOrigemForm, setShowEscopoOrigemForm] = useState(false);
  const [showEscopoTipoForm, setShowEscopoTipoForm] = useState(false);
  const [showEspecialidadeForm, setShowEspecialidadeForm] = useState(false);
  const [showExecutanteForm, setShowExecutanteForm] = useState(false);
  const [showFamiliaEquipamentosForm, setShowFamiliaEquipamentosForm] = useState(false);
  const [showPlantaForm, setShowPlantaForm] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [editingEscopoOrigem, setEditingEscopoOrigem] = useState(null);
  const [editingEscopoTipo, setEditingEscopoTipo] = useState(null);
  const [editingEspecialidade, setEditingEspecialidade] = useState(null);
  const [editingExecutante, setEditingExecutante] = useState(null);
  const [editingFamiliaEquipamentos, setEditingFamiliaEquipamentos] = useState(null);
  const [editingPlanta, setEditingPlanta] = useState(null);

  const handleButtonClick = (action) => {
    const userRole = "Administrador"; // This should come from your auth system
    if (!["Gestor", "Administrador", "Super Usuário"].includes(userRole)) {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      setSelectedOption(action);
    }
  };

  // Area handlers
  const handleEditArea = (area) => {
    setEditingArea(area);
    setShowAreaForm(true);
  };

  const handleDeleteArea = (areaId) => {
    setAreas(areas.filter(area => area.ID !== areaId));
    toast.success("Área excluída com sucesso");
  };

  const handleAddNewArea = () => {
    setEditingArea(null);
    setShowAreaForm(true);
  };

  const handleAreaFormSubmit = (data) => {
    if (editingArea) {
      setAreas(areas.map(area => area.ID === editingArea.ID ? { ...area, ...data } : area));
      toast.success("Área atualizada com sucesso");
    } else {
      const newArea = { ...data, ID: areas.length + 1 };
      setAreas([...areas, newArea]);
      toast.success("Nova área adicionada com sucesso");
    }
    setShowAreaForm(false);
    setEditingArea(null);
  };

  // Escopo Origem handlers
  const handleEditEscopoOrigem = (escopoOrigem) => {
    setEditingEscopoOrigem(escopoOrigem);
    setShowEscopoOrigemForm(true);
  };

  const handleDeleteEscopoOrigem = (escopoOrigemId) => {
    setEscopoOrigens(escopoOrigens.filter(escopo => escopo.ID !== escopoOrigemId));
    toast.success("Escopo Origem excluído com sucesso");
  };

  const handleAddNewEscopoOrigem = () => {
    setEditingEscopoOrigem(null);
    setShowEscopoOrigemForm(true);
  };

  const handleEscopoOrigemFormSubmit = (data) => {
    if (editingEscopoOrigem) {
      setEscopoOrigens(escopoOrigens.map(escopo => escopo.ID === editingEscopoOrigem.ID ? { ...escopo, ...data } : escopo));
      toast.success("Escopo Origem atualizado com sucesso");
    } else {
      const newEscopoOrigem = { ...data, ID: escopoOrigens.length + 1 };
      setEscopoOrigens([...escopoOrigens, newEscopoOrigem]);
      toast.success("Novo Escopo Origem adicionado com sucesso");
    }
    setShowEscopoOrigemForm(false);
    setEditingEscopoOrigem(null);
  };

  // Escopo Tipo handlers
  const handleEditEscopoTipo = (escopoTipo) => {
    setEditingEscopoTipo(escopoTipo);
    setShowEscopoTipoForm(true);
  };

  const handleDeleteEscopoTipo = (escopoTipoId) => {
    setEscopoTipos(escopoTipos.filter(escopo => escopo.ID !== escopoTipoId));
    toast.success("Escopo Tipo excluído com sucesso");
  };

  const handleAddNewEscopoTipo = () => {
    setEditingEscopoTipo(null);
    setShowEscopoTipoForm(true);
  };

  const handleEscopoTipoFormSubmit = (data) => {
    if (editingEscopoTipo) {
      setEscopoTipos(escopoTipos.map(escopo => escopo.ID === editingEscopoTipo.ID ? { ...escopo, ...data } : escopo));
      toast.success("Escopo Tipo atualizado com sucesso");
    } else {
      const newEscopoTipo = { ...data, ID: escopoTipos.length + 1 };
      setEscopoTipos([...escopoTipos, newEscopoTipo]);
      toast.success("Novo Escopo Tipo adicionado com sucesso");
    }
    setShowEscopoTipoForm(false);
    setEditingEscopoTipo(null);
  };

  // Especialidade handlers
  const handleEditEspecialidade = (especialidade) => {
    setEditingEspecialidade(especialidade);
    setShowEspecialidadeForm(true);
  };

  const handleDeleteEspecialidade = (especialidadeId) => {
    setEspecialidades(especialidades.filter(esp => esp.ID !== especialidadeId));
    toast.success("Especialidade excluída com sucesso");
  };

  const handleAddNewEspecialidade = () => {
    setEditingEspecialidade(null);
    setShowEspecialidadeForm(true);
  };

  const handleEspecialidadeFormSubmit = (data) => {
    if (editingEspecialidade) {
      setEspecialidades(especialidades.map(esp => esp.ID === editingEspecialidade.ID ? { ...esp, ...data } : esp));
      toast.success("Especialidade atualizada com sucesso");
    } else {
      const newEspecialidade = { ...data, ID: especialidades.length + 1 };
      setEspecialidades([...especialidades, newEspecialidade]);
      toast.success("Nova Especialidade adicionada com sucesso");
    }
    setShowEspecialidadeForm(false);
    setEditingEspecialidade(null);
  };

  // Executante handlers
  const handleEditExecutante = (executante) => {
    setEditingExecutante(executante);
    setShowExecutanteForm(true);
  };

  const handleDeleteExecutante = (executanteId) => {
    setExecutantes(executantes.filter(exec => exec.ID !== executanteId));
    toast.success("Executante excluído com sucesso");
  };

  const handleAddNewExecutante = () => {
    setEditingExecutante(null);
    setShowExecutanteForm(true);
  };

  const handleExecutanteFormSubmit = (data) => {
    if (editingExecutante) {
      setExecutantes(executantes.map(exec => exec.ID === editingExecutante.ID ? { ...exec, ...data } : exec));
      toast.success("Executante atualizado com sucesso");
    } else {
      const newExecutante = { ...data, ID: executantes.length + 1 };
      setExecutantes([...executantes, newExecutante]);
      toast.success("Novo Executante adicionado com sucesso");
    }
    setShowExecutanteForm(false);
    setEditingExecutante(null);
  };

  // Familia Equipamentos handlers
  const handleEditFamiliaEquipamentos = (familia) => {
    setEditingFamiliaEquipamentos(familia);
    setShowFamiliaEquipamentosForm(true);
  };

  const handleDeleteFamiliaEquipamentos = (familiaId) => {
    setFamiliaEquipamentos(familiaEquipamentos.filter(fam => fam.ID !== familiaId));
    toast.success("Família de Equipamentos excluída com sucesso");
  };

  const handleAddNewFamiliaEquipamentos = () => {
    setEditingFamiliaEquipamentos(null);
    setShowFamiliaEquipamentosForm(true);
  };

  const handleFamiliaEquipamentosFormSubmit = (data) => {
    if (editingFamiliaEquipamentos) {
      setFamiliaEquipamentos(familiaEquipamentos.map(fam => fam.ID === editingFamiliaEquipamentos.ID ? { ...fam, ...data } : fam));
      toast.success("Família de Equipamentos atualizada com sucesso");
    } else {
      const newFamiliaEquipamentos = { ...data, ID: familiaEquipamentos.length + 1 };
      setFamiliaEquipamentos([...familiaEquipamentos, newFamiliaEquipamentos]);
      toast.success("Nova Família de Equipamentos adicionada com sucesso");
    }
    setShowFamiliaEquipamentosForm(false);
    setEditingFamiliaEquipamentos(null);
  };


  // Planta handlers
  const handleEditPlanta = (planta) => {
    setEditingPlanta(planta);
    setShowPlantaForm(true);
  };

  const handleDeletePlanta = (plantaId) => {
    setPlantas(plantas.filter(planta => planta.ID !== plantaId));
    toast.success("Planta excluída com sucesso");
  };

  const handleAddNewPlanta = () => {
    setEditingPlanta(null);
    setShowPlantaForm(true);
  };

  const handlePlantaFormSubmit = (data) => {
    if (editingPlanta) {
      setPlantas(plantas.map(planta => planta.ID === editingPlanta.ID ? { ...planta, ...data } : planta));
      toast.success("Planta atualizada com sucesso");
    } else {
      const newPlanta = { ...data, ID: plantas.length + 1 };
      setPlantas([...plantas, newPlanta]);
      toast.success("Nova planta adicionada com sucesso");
    }
    setShowPlantaForm(false);
    setEditingPlanta(null);
  };

  const buttons = [
    "Despesa", "Sist. Operacional", "Situação Motivo", "Setor Solicitante", "Setor Responsável",
    "Serviço", "Recurso", "Planta", "Informativo", "Familia Equip.", "Executante", "Especialidade",
    "Escopo Tipo", "Escopo Origem", "Área", "Apoio"
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro Auxiliar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Opções de Cadastro</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(button)}
              variant="outline"
              className="w-full"
            >
              {button}
            </Button>
          ))}
        </CardContent>
      </Card>
      {/* ... (other options remain the same) */}
      {selectedOption === "Planta" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Plantas</CardTitle>
          </CardHeader>
          <CardContent>
            {showPlantaForm ? (
              <PlantaForm
                onSubmit={handlePlantaFormSubmit}
                onCancel={() => setShowPlantaForm(false)}
                initialData={editingPlanta}
              />
            ) : (
              <PlantaTable
                plantas={plantas}
                onEdit={handleEditPlanta}
                onDelete={handleDeletePlanta}
                onAddNew={handleAddNewPlanta}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CadastroAuxiliar;
